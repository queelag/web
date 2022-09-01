import type { Struct } from 'superstruct'
import { ImageCacheOptions, ShapeOptions } from './interfaces'
import { ButtonType, ButtonVariant, InputTouchTrigger, InputType, Layer, Shape, Size } from './types'

export interface AvatarElementAttributes extends BaseElementAttributes {}

export interface BaseElementAttributes {
  background?: string
  layer?: Layer
  shape?: Shape
  shapeOptions?: ShapeOptions
  size?: Size
}

export interface ButtonElementAttributes extends BaseElementAttributes {
  disabled?: boolean
  icon?: boolean
  normalized?: boolean
  _onClick?: Function
  spinning?: boolean
  type?: ButtonType
  variant?: ButtonVariant
}

export interface FormFieldElementAttributes {
  disabled?: boolean
  path?: string
  schema?: Struct
  target?: Record<PropertyKey, any>
  touched?: boolean
}

export interface IconElementAttributes extends BaseElementAttributes {
  fill?: string
  height?: string | number
  src: string
  stroke?: string
  strokeWidth?: string | number
  width?: string | number
}

export interface ImageElementAttributes extends BaseElementAttributes {
  alt?: string
  cache?: boolean
  cacheOptions?: ImageCacheOptions
  crossOrigin?: string
  height?: string | number
  src: string
  width?: string | number
}

export interface InputElementAttributes extends FormFieldElementAttributes {
  multiple?: boolean
  obscured?: boolean
  placeholder?: string
  touchtrigger?: InputTouchTrigger
  type: InputType
}
