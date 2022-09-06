import { Config as SanitizeConfig } from 'isomorphic-dompurify'

export interface DeserializeFileOptions {
  resolve?: {
    array_buffer?: boolean
    text?: boolean
  }
}

export interface IconElementSanitizeConfig extends SanitizeConfig {
  RETURN_DOM?: false | undefined
  RETURN_DOM_FRAGMENT?: false | undefined
}

export interface ImageCacheOptions {
  quality?: number
  type?: 'image/jpeg' | 'image/png' | 'image/webp'
}

export interface SelectOption {
  label?: string
  value: any
}

export interface ShapeOptions {
  rectangle?: {
    radius?: number
  }
  square?: {
    radius?: number
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
