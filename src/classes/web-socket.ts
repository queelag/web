import { DeferredPromise, EventEmitter, isStringJSON, Queue, QueueFunction, QueueProcess, tc } from '@aracna/core'
import type { WebSocketEvents, WebSocketOpenOptions, WebSocketOptions } from '../definitions/interfaces.js'
import type { WebSocketEventData, WebSocketTransformMessageData } from '../definitions/types.js'
import { DEFAULT_WEB_SOCKET_BINARY_TYPE, DEFAULT_WEB_SOCKET_TRANSFORM_MESSAGE_DATA, DEFAULT_WEB_SOCKET_TRANSFORM_SEND_DATA } from '../index.js'
import { ClassLogger } from '../loggers/class-logger.js'

/**
 * The `WebSocket` class is built on top of the native `WebSocket` class.
 *
 * - The close method is asynchronous and resolves when the connection is closed.
 * - The open method is asynchronous and resolves when the connection is opened.
 * - The send method can send blobs, buffers, objects and strings.
 * - The received message data will be automatically parsed if it is a JSON string.
 * - The data to send can be transformed before sending with the `transformSendData` method.
 * - The received data can be transformed before handling it in the message event with the `transformMessageData` method.
 *
 * Events:
 *
 * - The `close` event is emitted when the connection is closed.
 * - The `error` event is emitted when the connection crashes.
 * - The `message` event is emitted when a message is received.
 * - The `open` event is emitted when the connection is opened.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/classes/web-socket)
 */
class AracnaWebSocket extends EventEmitter<WebSocketEvents> {
  /**
   * The binary type, can be either `blob` or `arraybuffer`.
   */
  protected binaryType: BinaryType
  /**
   * The native web socket instance.
   */
  protected instance?: WebSocket
  /**
   * The protocols to use.
   */
  protected protocols: string | string[] | undefined
  /**
   * The connection queue.
   */
  protected queue: Queue
  /**
   * The URL to connect to.
   */
  protected url: string

  constructor(url: string, options?: WebSocketOptions) {
    super()

    this.binaryType = options?.binaryType ?? DEFAULT_WEB_SOCKET_BINARY_TYPE
    this.protocols = options?.protocols
    this.queue = new Queue({ autostart: true, concurrency: 1 })
    this.url = url

    this.transformMessageData = options?.transform?.messageData ?? DEFAULT_WEB_SOCKET_TRANSFORM_MESSAGE_DATA
    this.transformSendData = options?.transform?.sendData ?? DEFAULT_WEB_SOCKET_TRANSFORM_SEND_DATA
  }

  /**
   * Closes the connection.
   * Optionally with a code and a reason.
   */
  async close(code?: number, reason?: string): Promise<void | Error> {
    if (this.isReadyStateClosed) {
      return ClassLogger.verbose(this.url, 'close', `The web socket connection is already closed.`)
    }

    if (this.isReadyStateClosing) {
      let cp: DeferredPromise<Event>, ep: DeferredPromise<Event>

      cp = new DeferredPromise()
      ep = new DeferredPromise()

      this.instance?.addEventListener('close', cp.resolve)
      this.instance?.addEventListener('error', ep.resolve)

      await Promise.race([cp.instance, ep.instance])

      this.instance?.removeEventListener('close', cp.resolve)
      this.instance?.removeEventListener('error', ep.resolve)

      ClassLogger.info(this.url, 'close', `The web socket has closed the connection.`)

      return
    }

    if (this.isReadyStateConnecting) {
      let ep: DeferredPromise<Event>, op: DeferredPromise<Event>

      ep = new DeferredPromise()
      op = new DeferredPromise()

      this.instance?.addEventListener('error', ep.resolve)
      this.instance?.addEventListener('open', op.resolve)

      await Promise.race([ep.instance, op.instance])

      this.instance?.removeEventListener('error', ep.resolve)
      this.instance?.removeEventListener('open', op.resolve)

      return this.close(code, reason)
    }

    if (this.isReadyStateOpen) {
      let cp: DeferredPromise<Event>, ep: DeferredPromise<Event>, close: void | Error

      cp = new DeferredPromise()
      ep = new DeferredPromise()

      this.instance?.addEventListener('close', cp.resolve, { once: true })
      this.instance?.addEventListener('error', ep.resolve, { once: true })

      ClassLogger.info(this.url, 'close', `The web socket is closing the connection...`)

      close = tc(() => this.instance?.close(code, reason))

      if (close instanceof Error) {
        this.instance?.removeEventListener('close', cp.resolve)
        this.instance?.removeEventListener('error', ep.resolve)

        return close
      }

      await Promise.race([cp.instance, ep.instance])

      this.instance?.removeEventListener('close', cp.resolve)
      this.instance?.removeEventListener('error', ep.resolve)

      ClassLogger.info(this.url, 'close', `The web socket has closed the connection.`)
    }
  }

  /**
   * Opens the connection.
   * Optionally the binary type, protocols, data transformers and URL can be set before opening the connection.
   */
  async open(options?: WebSocketOpenOptions): Promise<void | Error> {
    let promise: DeferredPromise<void | Error>,
      fn: QueueFunction,
      cf: (process: QueueProcess<void | Error>) => void,
      rf: (process: QueueProcess) => void,
      tf: (process: QueueProcess) => void

    if (this.isReadyStateConnecting) {
      let ep: DeferredPromise<Event>, op: DeferredPromise<Event>

      ep = new DeferredPromise()
      op = new DeferredPromise()

      this.instance?.addEventListener('error', ep.resolve)
      this.instance?.addEventListener('open', op.resolve)

      await Promise.race([ep.instance, op.instance])

      this.instance?.removeEventListener('error', ep.resolve)
      this.instance?.removeEventListener('open', op.resolve)

      return
    }

    if (this.isReadyStateOpen && !options?.force) {
      return ClassLogger.verbose(this.url, 'open', `The web socket connection is already open.`)
    }

    promise = new DeferredPromise()

    fn = async () => {
      let socket: WebSocket | Error, ep: DeferredPromise<Event>, op: DeferredPromise<Event>

      this.binaryType = options?.binaryType ?? this.binaryType
      this.protocols = options?.protocols ?? this.protocols
      this.url = options?.url ?? this.url

      this.transformMessageData = options?.transform?.messageData ?? this.transformMessageData
      this.transformSendData = options?.transform?.sendData ?? this.transformSendData

      socket = tc(() => new WebSocket(this.url, this.protocols))
      if (socket instanceof Error) return socket

      this.instance = socket
      ClassLogger.info(this.url, 'open', `The web socket instance has been created.`, this.instance)

      this.instance.binaryType = this.binaryType
      ClassLogger.verbose(this.url, 'open', `The binary type has been set.`, [this.binaryType])

      this.instance.addEventListener('close', this.onClose.bind(this))
      this.instance.addEventListener('error', this.onError.bind(this))
      this.instance.addEventListener('message', this.onMessage.bind(this))
      this.instance.addEventListener('open', this.onOpen.bind(this))

      ep = new DeferredPromise()
      op = new DeferredPromise()

      this.instance.addEventListener('error', ep.resolve, { once: true })
      this.instance.addEventListener('open', op.resolve, { once: true })

      await Promise.race([ep.instance, op.instance])
    }

    cf = (process: QueueProcess<void | Error>) => {
      if (process.fn === fn) {
        promise.resolve(process.value)
      }
    }

    rf = (process: QueueProcess) => {
      if (process.fn === fn) {
        promise.reject(process.reason)
      }
    }

    tf = (process: QueueProcess) => {
      if (process.fn === fn) {
        promise.reject()
      }
    }

    this.queue.on('process-fulfill', cf)
    this.queue.on('process-reject', rf)
    this.queue.on('process-timeout', tf)

    this.queue.push(() => this.close(), fn)

    await promise.instance

    this.queue.off('process-fulfill', cf)
    this.queue.off('process-reject', rf)
    this.queue.off('process-timeout', tf)

    return promise.instance
  }

  /**
   * Sends data to the web socket.
   *
   * - The data will be left as is if it is an `ArrayBuffer` or a `Blob`.
   * - The data will be JSON stringified if it is an object.
   * - The data will be transformed with the `transformSendData` method.
   */
  async send<T extends object>(data: WebSocketEventData<T>): Promise<void | Error> {
    let tdata: WebSocketEventData<T>, send: void | Error

    if (this.isReadyStateNotOpen) {
      return ClassLogger.warn(this.url, 'send', `The web socket ready state is not open, this message can't be sent.`)
    }

    switch (true) {
      case data instanceof ArrayBuffer:
      case data instanceof Blob:
        tdata = data
        ClassLogger.verbose(this.url, 'send', `The data is an ArrayBuffer or Blob, no transformations are needed.`, tdata)

        break
      default:
        if (typeof data === 'object') {
          tdata = JSON.stringify(data)
          ClassLogger.verbose(this.url, 'send', `The data has been JSON stringified.`, [tdata])

          break
        }

        tdata = data
        ClassLogger.verbose(this.url, 'send', `The data does not need any transformations.`, [tdata])

        break
    }

    tdata = await this.transformSendData(data)
    ClassLogger.verbose(this.url, 'send', `The data has been transformed.`, [tdata])

    send = tc(() => this.instance?.send(tdata as any))
    if (send instanceof Error) return send

    ClassLogger.info(this.url, 'send', `The data has been sent.`, [tdata])
  }

  protected async transformMessageData<T extends object>(data: WebSocketEventData<T>): Promise<T> {
    return DEFAULT_WEB_SOCKET_TRANSFORM_MESSAGE_DATA(data)
  }

  protected async transformSendData<T extends object>(data: WebSocketEventData<T>): Promise<T> {
    return DEFAULT_WEB_SOCKET_TRANSFORM_SEND_DATA(data)
  }

  /**
   * Emits the `close` event.
   */
  protected async onClose(event: CloseEvent): Promise<void> {
    ClassLogger.info(this.url, 'onClose', `The web socket connection has been closed.`, event)

    this.emit('close', event)
    ClassLogger.verbose(this.url, 'onClose', `The close event has been emitted.`, event)
  }

  /**
   * Emits the `error` event.
   */
  protected async onError(event: Event): Promise<void> {
    ClassLogger.error(this.url, 'onError', `The web socket crashed.`, event)

    this.emit('error', event)
    ClassLogger.verbose(this.url, 'onError', `The error event has been emitted.`, event)
  }

  /**
   * Emits the `message` event.
   *
   * - The data will be JSON parsed if it is a JSON string.
   * - The data will be transformed with the `transformMessageData` method.
   */
  protected async onMessage(event: MessageEvent): Promise<void> {
    ClassLogger.info(this.url, 'onMessage', `The web socket received a message.`, event)

    if (isStringJSON(event.data)) {
      event = { ...event, data: JSON.parse(event.data) }
      ClassLogger.verbose(this.url, 'onMessage', `The data has been JSON parsed.`, event.data)
    }

    event = { ...event, data: await this.transformMessageData(event.data) }
    ClassLogger.verbose(this.url, 'onMessage', `The data has been transformed.`, event.data)

    this.emit('message', event)
    ClassLogger.verbose(this.url, 'onMessage', `The message event has been emitted.`, event)
  }

  /**
   * Emits the `open` event.
   */
  protected async onOpen(event: Event): Promise<void> {
    ClassLogger.info(this.url, 'onOpen', `The web socket connection has been opened.`, event)

    this.emit('open', event)
    ClassLogger.verbose(this.url, 'onOpen', `The open event has been emitted.`, event)
  }

  /**
   * Returns the binary type.
   */
  getBinaryType(): BinaryType {
    return this.binaryType
  }

  /**
   * Returns the protocols.
   */
  getProtocols(): string | string[] | undefined {
    return this.protocols
  }

  /**
   * Returns the ready state.
   *
   * 0 (CONNECTING)
   * 1 (OPEN)
   * 2 (CLOSING)
   * 3 (CLOSED)
   */
  getReadyState(): number {
    return this.instance?.readyState ?? WebSocket.CLOSED
  }

  /**
   * Returns the URL.
   */
  getURL(): string {
    return this.url
  }

  /**
   * Sets the binary type, can be either `blob` or `arraybuffer`.
   */
  setBinaryType(type: BinaryType): void {
    if (typeof this.instance === 'undefined') {
      return
    }

    this.instance.binaryType = type
  }

  /**
   * Sets the protocols.
   */
  setProtocols(protocols: string | string[] | undefined): this {
    this.protocols = protocols
    return this
  }

  /**
   * Sets the transform message data method.
   */
  setTransformMessageData(transformMessageData: WebSocketTransformMessageData<any>): this {
    this.transformMessageData = transformMessageData
    return this
  }

  /**
   * Sets the transform send data method.
   */
  setTransformSendData(transformSendData: WebSocketTransformMessageData<any>): this {
    this.transformSendData = transformSendData
    return this
  }

  /**
   * Sets the URL.
   */
  setURL(url: string): this {
    this.url = url
    return this
  }

  /**
   * Checks if the ready state is `CLOSED`.
   */
  get isReadyStateClosed(): boolean {
    return this.getReadyState() === WebSocket.CLOSED
  }

  /**
   * Checks if the ready state is not `CLOSED`.
   */
  get isReadyStateNotClosed(): boolean {
    return this.getReadyState() !== WebSocket.CLOSED
  }

  /**
   * Checks if the ready state is `CLOSING`.
   */
  get isReadyStateClosing(): boolean {
    return this.getReadyState() === WebSocket.CLOSING
  }

  /**
   * Checks if the ready state is not `CLOSING`.
   */
  get isReadyStateNotClosing(): boolean {
    return this.getReadyState() !== WebSocket.CLOSING
  }

  /**
   * Checks if the ready state is `CONNECTING`.
   */
  get isReadyStateConnecting(): boolean {
    return this.getReadyState() === WebSocket.CONNECTING
  }

  /**
   * Checks if the ready state is not `CONNECTING`.
   */
  get isReadyStateNotConnecting(): boolean {
    return this.getReadyState() !== WebSocket.CONNECTING
  }

  /**
   * Checks if the ready state is `OPEN`.
   */
  get isReadyStateOpen(): boolean {
    return this.getReadyState() === WebSocket.OPEN
  }

  /**
   * Checks if the ready state is not `OPEN`.
   */
  get isReadyStateNotOpen(): boolean {
    return this.getReadyState() !== WebSocket.OPEN
  }
}

export { AracnaWebSocket as WebSocket }
