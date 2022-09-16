import { Base64, ID, tcp } from '@queelag/core'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'

export class QueelagFile {
  private _arrayBuffer?: ArrayBuffer
  private _base64?: string
  private readonly file: File
  readonly id: string
  private _text?: string

  constructor(file: File) {
    this.file = file
    this.id = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: 'input_file_item' })
  }

  async resolveArrayBuffer(): Promise<void> {
    let buffer: ArrayBuffer | Error

    buffer = await tcp(() => this.file.arrayBuffer())
    if (buffer instanceof Error) return

    this._arrayBuffer = buffer
  }

  async resolveText(): Promise<void> {
    let text: string | Error

    text = await tcp(() => this.file.text())
    if (text instanceof Error) return

    this._text = text
  }

  slice(start?: number, end?: number, contentType?: string): Blob {
    return this.file.slice(start, end, contentType)
  }

  stream(): ReadableStream<Uint8Array>
  stream(): NodeJS.ReadableStream
  stream(): any {
    return this.file.stream()
  }

  get arrayBuffer(): ArrayBuffer {
    return this._arrayBuffer || new ArrayBuffer(0)
  }

  get base64(): string {
    let base64: string

    if (this._base64) {
      return this._base64
    }

    base64 = Base64.encode(this.uInt8Array)
    this._base64 = base64

    return this._base64
  }

  get lastModified(): number {
    return this.file.lastModified
  }

  get lastModifiedDate(): Date {
    return new Date(this.file.lastModified)
  }

  get name(): string {
    return this.file.name
  }

  get size(): number {
    return this.file.size
  }

  get text(): string {
    return this._text || ''
  }

  get type(): string {
    return this.file.type || 'application/octet-stream'
  }

  get uInt8Array(): Uint8Array {
    return new Uint8Array(this.arrayBuffer)
  }

  get webkitRelativePath(): string {
    return this.file.webkitRelativePath
  }

  static get EMPTY(): QueelagFile {
    return new QueelagFile(new File([], ''))
  }
}
