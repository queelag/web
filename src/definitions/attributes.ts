import { ButtonType, ButtonVariant, Layer, Shape, Size } from './types'

export interface BaseElementAttributes {
  layer?: Layer
  shape?: Shape
  size?: Size
}

export interface ButtonElementAttributes extends BaseElementAttributes {
  disabled?: boolean
  icon?: boolean
  spinning?: boolean
  type?: ButtonType
  variant?: ButtonVariant
  _onClick?: Function
}

export interface IconElementAttributes extends BaseElementAttributes {
  fill?: string
  height?: string | number
  src: string
  stroke?: string
  strokeWidth?: string | number
  width?: string | number
}
