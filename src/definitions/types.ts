export type ButtonType = 'button' | 'menu' | 'reset' | 'submit'
export type ButtonVariant = 'contained' | 'opacity' | 'outline' | 'text'

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
export type InputMode = 'multiple' | 'single'
export type InputFileMode = InputMode
export type InputTouchTrigger = 'blur' | 'change' | 'none'
export type InputType = 'buffer' | 'date' | 'date_time' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'
export type Layer = 0 | 1 | 2 | 3
export type Orientation = 'horizontal' | 'vertical'
export type SelectMode = InputMode
export type Shape = 'circle' | 'rectangle' | 'square' | 'squircle'
export type Size = 'small' | 'medium' | 'large' | string | number
export type TextAreaMode = InputMode
export type TextAreaTouchTrigger = InputTouchTrigger
export type Theme = 'dark' | 'light' | 'system'
