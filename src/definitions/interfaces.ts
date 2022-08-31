import { Config as SanitizeConfig } from 'isomorphic-dompurify'

export interface IconElementSanitizeConfig extends SanitizeConfig {
  RETURN_DOM?: false | undefined
  RETURN_DOM_FRAGMENT?: false | undefined
}

export interface ImageCacheOptions {
  quality?: number
  type?: 'image/jpeg' | 'image/png' | 'image/webp'
}

export interface ShapeOptions {
  rectangle?: {
    radius?: string
  }
  square?: {
    radius?: string
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
