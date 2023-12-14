import { EventEmitterEvents } from '@aracna/core'
import type { Config as SanitizeConfig } from 'dompurify'
import { CanvasDataURLType } from './types.js'

export interface GetImageElementBase64Options {
  quality?: number
  type?: CanvasDataURLType
}

export interface GetImageSrcBase64Options extends GetImageElementBase64Options {
  crossOrigin?: 'anonymous' | 'use-credentials' | null
}

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
  message: (event: MessageEvent) => any
  open: (event: Event) => any
}
