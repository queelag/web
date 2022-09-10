import { Config as SanitizeConfig } from 'isomorphic-dompurify'
import { CanvasDataURLType } from './types'

export interface DeserializeFileOptions {
  resolve?: {
    arrayBuffer?: boolean
    text?: boolean
  }
}

export interface GetImageElementBase64Options {
  quality?: number
  type?: CanvasDataURLType
}

export interface IconElementSanitizeConfig extends SanitizeConfig {
  RETURN_DOM?: false | undefined
  RETURN_DOM_FRAGMENT?: false | undefined
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

export interface SquircleOptions {
  curvature?: number
}
