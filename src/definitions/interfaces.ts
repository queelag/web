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
  RETURN_DOM?: false | undefined
  RETURN_DOM_FRAGMENT?: false | undefined
}

export interface QueryDeclaration {
  all?: boolean
  closest?: boolean
  selector: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | string
  shadow?: boolean
}

export interface QueryDeclarations extends Record<string, QueryDeclaration> {}

export interface RadioButton {
  label?: string
  value: any
}

export interface SelectOption {
  label?: string
  value: any
}

export interface ShapeOptions {
  rectangle?: {
    radius?: string | number
  }
  square?: {
    radius?: string | number
  }
  squircle?: {
    curvature?: number
    id?: string
    size?: number
  }
}
