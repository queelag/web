import { DeferredPromise, EventEmitter, clearInterval, isStringJSON, setInterval, tc } from '@aracna/core'
import { WebSocketEvents } from '../definitions/interfaces.js'
import { WebSocketEventData } from '../definitions/types.js'
import { ClassLogger } from '../loggers/class-logger.js'

class AracnaWebSocket extends EventEmitter<WebSocketEvents> {
  instance: WebSocket
  name: string
  protocols: string | string[] | undefined
  url: string

  constructor(name: string, url: string, protocols?: string | string[]) {
    super()

    this.instance = {} as any
    this.name = name
    this.protocols = protocols
    this.url = url
  }

  async close(): Promise<void | Error> {
    let close: void | Error, promise: DeferredPromise<void>

    close = tc(() => this.instance.close())
    if (close instanceof Error) return close

    ClassLogger.debug(this.id, 'close', `The web socket is closing the connection.`)

    promise = new DeferredPromise()

    setInterval(
      () => {
        if (this.isReadyStateClosed) {
          clearInterval(this.name)
          promise.resolve()
        }
      },
      100,
      this.name
    )

    return promise.instance
  }

  async open(): Promise<void | Error> {
    let socket: WebSocket | Error, promise: DeferredPromise<void>

    socket = tc(() => new WebSocket(this.url, this.protocols))
    if (socket instanceof Error) return socket

    this.instance = socket
    this.instance.onclose = this.onClose
    this.instance.onerror = this.onError
    this.instance.onmessage = this.onMessage
    this.instance.onopen = this.onOpen

    promise = new DeferredPromise()

    setInterval(
      () => {
        if (this.isReadyStateOpen) {
          clearInterval(this.name)
          promise.resolve()
        }
      },
      100,
      this.name
    )

    return promise.instance
  }

  send<T extends object>(data: WebSocketEventData<T>): void | Error {
    let tdata: WebSocketEventData<T>, send: void | Error

    if (this.isReadyStateNotOpen) {
      ClassLogger.warn(this.id, 'send', `The web socket ready state is not open, this message can't be sent.`)
      return
    }

    switch (true) {
      case data instanceof ArrayBuffer:
      case data instanceof Blob:
        tdata = data
        ClassLogger.debug(this.id, 'send', `The data is an ArrayBuffer or Blob, no transformations are needed.`, tdata)

        break
      default:
        if (typeof data === 'object') {
          tdata = JSON.stringify(data)
          ClassLogger.debug(this.id, 'send', `The data has been JSON stringified.`, [tdata])

          break
        }

        tdata = data
        break
    }

    tdata = this.transformOutgoingData(data)
    ClassLogger.debug(this.id, 'send', `The data has been transformed.`, [tdata])

    send = tc(() => this.instance.send(tdata as any))
    if (send instanceof Error) return send
  }

  transformIncomingData<T extends object>(data: WebSocketEventData<T>): WebSocketEventData<T> {
    return data
  }

  transformOutgoingData<T extends object>(data: WebSocketEventData<T>): WebSocketEventData<T> {
    return data
  }

  setBinaryType(type: BinaryType): void {
    this.instance.binaryType = type
    ClassLogger.debug(this.id, 'setBinaryType', `The binary type has been set to ${type}.`)
  }

  onClose = (event: CloseEvent) => {
    ClassLogger.debug(this.id, 'onClose', `The web socket connection has been closed.`, event)

    this.emit('close', event)
    ClassLogger.verbose(this.id, 'onClose', `The close event has been emitted.`, event)
  }

  onError = (event: Event) => {
    ClassLogger.debug(this.id, 'onError', `The web socket crashed.`, event)

    this.emit('error', event)
    ClassLogger.verbose(this.id, 'onError', `The error event has been emitted.`, event)
  }

  onMessage = (event: MessageEvent) => {
    ClassLogger.debug(this.id, 'onMessage', `The web socket received a message.`, event)

    if (isStringJSON(event.data)) {
      event = { ...event, data: JSON.parse(event.data) }
      ClassLogger.debug(this.id, 'onMessage', `The data has been JSON parsed.`, event.data)
    }

    event = { ...event, data: this.transformIncomingData(event.data) }
    ClassLogger.debug(this.id, 'onMessage', `The data has been transformed.`, event.data)

    this.emit('message', event)
    ClassLogger.verbose(this.id, 'onMessage', `The message event has been emitted.`, event)
  }

  onOpen = (event: Event) => {
    ClassLogger.debug(this.id, 'onOpen', `The web socket connection has been opened.`, event)

    this.emit('open', event)
    ClassLogger.verbose(this.id, 'onOpen', `The open event has been emitted.`, event)
  }

  get id(): string {
    return 'WEB_SOCKET_' + this.name
  }

  get isReadyStateClosed(): boolean {
    return this.instance.readyState === WebSocket.CLOSED
  }

  get isReadyStateNotClosed(): boolean {
    return this.instance.readyState !== WebSocket.CLOSED
  }

  get isReadyStateClosing(): boolean {
    return this.instance.readyState === WebSocket.CLOSING
  }

  get isReadyStateNotClosing(): boolean {
    return this.instance.readyState !== WebSocket.CLOSING
  }

  get isReadyStateConnecting(): boolean {
    return this.instance.readyState === WebSocket.CONNECTING
  }

  get isReadyStateNotConnecting(): boolean {
    return this.instance.readyState !== WebSocket.CONNECTING
  }

  get isReadyStateOpen(): boolean {
    return this.instance.readyState === WebSocket.OPEN
  }

  get isReadyStateNotOpen(): boolean {
    return this.instance.readyState !== WebSocket.OPEN
  }
}

export { AracnaWebSocket as WebSocket }
