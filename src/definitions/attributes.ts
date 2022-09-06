import type { Struct } from 'superstruct'
import { ImageCacheOptions, SelectOption } from './interfaces'
import { ButtonType, ButtonVariant, InputTouchTrigger, InputType, Layer, Orientation, Shape, Size, TextAreaResize } from './types'

export interface AvatarElementAttributes extends BaseElementAttributes {}

export interface BadgeElementAttributes extends BaseElementAttributes {
  maximum?: number
  minimum?: number
  value?: number | string
}

export interface BaseElementAttributes {
  background?: string
  height?: number | string
  layer?: Layer
  shape?: Shape
  'shape-rectangle-radius'?: number
  'shape-square-radius'?: number
  'shape-squircle-curvature'?: number
  'shape-squircle-size'?: number
  size?: Size
  width?: number | string
}

export interface ButtonElementAttributes extends BaseElementAttributes {
  disabled?: boolean
  icon?: boolean
  normalized?: boolean
  spinning?: boolean
  type?: ButtonType
  variant?: ButtonVariant
}

export interface CheckBoxElementAttributes extends FormFieldElementAttributes {
  custom?: boolean
  native?: boolean
  normalized?: boolean
}

export interface DividerElementAttributes extends BaseElementAttributes {
  orientation?: Orientation
}

export interface FormElementAttributes extends BaseElementAttributes {}

export interface FormFieldElementAttributes extends BaseElementAttributes {
  disabled?: boolean
  path?: string
  schema?: Struct<any, any>
  target?: Record<PropertyKey, any>
  touched?: boolean
}

export interface IconElementAttributes extends BaseElementAttributes {
  fill?: string
  src: string
  stroke?: string
  'stroke-width'?: string | number
}

export interface ImageElementAttributes extends BaseElementAttributes {
  alt?: string
  cache?: boolean
  'cache-options'?: ImageCacheOptions
  'cross-origin'?: string
  src: string
}

export interface InputElementAttributes extends FormFieldElementAttributes {
  autofocus?: boolean
  multiple?: boolean
  normalized?: boolean
  obscured?: boolean
  padding?: string
  placeholder?: string
  'touch-trigger'?: InputTouchTrigger
  type: InputType
}

export interface InputFileElementAttributes extends FormFieldElementAttributes {
  'deserialize-file-resolve-array-buffer'?: boolean
  'deserialize-file-resolve-text'?: boolean
  multiple?: boolean
  native?: boolean
}

export interface MeterElementAttributes extends BaseElementAttributes {
  low?: number
  high?: number
  maximum?: number
  minimum?: number
  native?: boolean
  optimum?: number
  round?: boolean
  value?: number
}

export interface SelectElementAttributes extends FormFieldElementAttributes {
  multiple?: boolean
  native?: boolean
  normalized?: boolean
  options?: SelectOption[]
}

export interface SwitchElementAttributes extends FormFieldElementAttributes {
  native?: boolean
}

export interface TextAreaElementAttributes extends Omit<InputElementAttributes, 'obscured' | 'type'> {
  autosize?: boolean
  cols?: number
  resize?: TextAreaResize
  rows?: number
}
