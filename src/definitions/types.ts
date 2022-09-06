import type { Struct, StructError } from 'superstruct'

export type ButtonType = 'button' | 'menu' | 'reset' | 'submit'
export type ButtonVariant = 'fill' | 'fill-tonal' | 'opacity' | 'outline' | 'text'

export type Color =
  | 'amber'
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'fuchsia'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'mono'
  | 'mono_inverted'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'rose'
  | 'teal'
  | 'violet'
  | 'yellow'
  | string

export type Constructor<T> = new (...args: any[]) => T

export type Direction = 'down' | 'left' | 'right' | 'up'
export type DirectionHorizontal = 'left' | 'right'
export type DirectionVertical = 'down' | 'up'
export type FeedbackType = 'error' | 'information' | 'success' | 'warning'

export type FormFieldElementSchema = Struct<any, any> | undefined
export type FormFieldElementTarget = Record<PropertyKey, any>
export type FormFieldElementValidation = [StructError | undefined, any]

export type ImageCrossOrigin = 'anonymous' | 'use-credentials'
export type ImageStatus = 'idle' | 'fetching' | 'loaded' | 'error'

export type InputTouchTrigger = 'blur' | 'change'

export type InputType =
  | 'buffer'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

export type InputValue = Date | number | string | string[] | undefined | Uint8Array

export type Layer = 0 | 1 | 2 | 3
export type Orientation = 'horizontal' | 'vertical'
export type Shape = 'circle' | 'rectangle' | 'square' | 'squircle'
export type Size = 'small' | 'medium' | 'large' | string | number

export type TextAreaTouchTrigger = InputTouchTrigger
export type TextAreaValue = string | string[] | undefined
export type TextAreaResize = 'both' | 'horizontal' | 'vertical' | 'none'

export type Theme = 'dark' | 'light' | 'system'
