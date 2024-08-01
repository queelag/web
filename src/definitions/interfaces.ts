import type { EventEmitterEvents } from '@aracna/core'
import type { CanvasDataURLType, WebSocketTransformMessageData, WebSocketTransformSendData } from './types.js'

export interface CacheImageElementBase64 extends Omit<GetImageElementBase64Options, 'cache'> {
  force?: boolean
}

export interface CacheImageSrcBase64 extends CacheImageElementBase64, Omit<GetImageSrcBase64Options, 'cache'> {}

export interface GetImageElementBase64Options {
  cache?: boolean
  quality?: number
  type?: CanvasDataURLType
}

export interface GetImageSrcBase64Options extends GetImageElementBase64Options {
  crossOrigin?: 'anonymous' | 'use-credentials' | null
}

export interface WebSocketEvents extends EventEmitterEvents {
  close: (event: CloseEvent) => any
  error: (event: Event) => any
  message: <T = any>(event: MessageEvent<T>) => any
  open: (event: Event) => any
}

export interface WebSocketOptions {
  binaryType?: BinaryType
  protocols?: string | string[]
  transform?: {
    messageData?: WebSocketTransformMessageData<any>
    sendData?: WebSocketTransformSendData<any>
  }
}

export interface WebSocketOpenOptions extends WebSocketOptions {
  url?: string
}
