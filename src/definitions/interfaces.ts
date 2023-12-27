import type { EventEmitterEvents, GetNumberPercentageOptions } from '@aracna/core'
import type { Config as SanitizeConfig } from 'dompurify'
import type { CanvasDataURLType, WebSocketTransformMessageData, WebSocketTransformSendData } from './types.js'

export interface AppendSquircleElementOptions extends CreateSquircleElementOptions {}

export interface CacheImageElementBase64 extends Omit<GetImageElementBase64Options, 'cache'> {
  force?: boolean
}

export interface CacheImageSrcBase64 extends CacheImageElementBase64, Omit<GetImageSrcBase64Options, 'cache'> {}

export interface CreateSquircleElementOptions {
  curvature?: number
  size?: number
}

export interface GetImageElementBase64Options {
  cache?: boolean
  quality?: number
  type?: CanvasDataURLType
}

export interface GetImageSrcBase64Options extends GetImageElementBase64Options {
  crossOrigin?: 'anonymous' | 'use-credentials' | null
}

export interface GetSliderThumbElementPercentageOptions extends GetNumberPercentageOptions {
  decimals?: number
}

export interface GetSquircleElementOptions extends CreateSquircleElementOptions {}

export interface IconElementSanitizeConfig extends SanitizeConfig {
  RETURN_DOM?: false
  RETURN_DOM_FRAGMENT?: false
}

export interface QueryDeclaration {
  all?: boolean
  closest?: boolean
  selector: string
  shadow?: boolean
}

export interface QueryDeclarations extends Record<string, QueryDeclaration> {}

export interface ShapeOptions {
  rectangle?: {
    radius?: string | number
  }
  square?: {
    radius?: string | number
  }
  squircle?: {
    curvature?: number
    size?: number
  }
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
