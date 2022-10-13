import type { FocusTargetValueOrFalse, KeyboardEventToBoolean, MouseEventToBoolean } from 'focus-trap'
import type { Struct, StructError } from 'superstruct'

export type AriaAlertSeverity = 'error' | 'info' | 'success' | 'warning'
export type AriaAlertVariant = 'fill' | 'fill-tonal' | 'opacity' | 'outline' | 'text'
export type AriaComboBoxElementAutoComplete = 'none' | 'inline' | 'list' | 'both'
export type AriaLive = 'off' | 'polite' | 'assertive'

export type ButtonPressed = 'false' | 'mixed' | 'true'
export type ButtonType = 'button' | 'menu' | 'reset' | 'submit'
export type ButtonVariant = 'fill' | 'fill-tonal' | 'opacity' | 'outline' | 'text'

export type CanvasDataURLType = 'image/jpeg' | 'image/png' | 'image/webp'

export type ChipElementVariant = 'assist' | 'filter' | 'input' | 'suggestion'

export type Color =
  | 'amber'
  | 'black'
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'fuchsia'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'rose'
  | 'teal'
  | 'violet'
  | 'yellow'
  | 'white'
  | string

export type Constructor<T> = new (...args: any[]) => T

export type Direction = 'down' | 'left' | 'right' | 'up'
export type DirectionHorizontal = 'left' | 'right'
export type DirectionVertical = 'down' | 'up'

export type ElementAttributeValue = string | null | undefined
export type ElementAttributes = Record<string, ElementAttributeValue>

export type FocusTrapAllowOutsideClick = boolean | MouseEventToBoolean
export type FocusTrapCheckCanFocusTrap = (containers: Array<HTMLElement | SVGElement>) => Promise<void>
export type FocusTrapCheckCanReturnFocus = (trigger: HTMLElement | SVGElement) => Promise<void>
export type FocusTrapClickOutsideDeactivates = boolean | MouseEventToBoolean
export type FocusTrapDisplayCheck = 'full' | 'legacy-full' | 'non-zero-area' | 'none'
export type FocusTrapEscapeDeactivates = boolean | KeyboardEventToBoolean
export type FocusTrapGetShadowRoot = boolean | ((node: HTMLElement | SVGElement) => ShadowRoot | boolean | undefined)
export type FocusTrapSetReturnFocus = FocusTargetValueOrFalse | ((nodeFocusedBeforeActivation: HTMLElement | SVGElement) => FocusTargetValueOrFalse)

export type FormFieldElementSchema = Struct<any, any> | undefined
export type FormFieldElementTarget = Record<PropertyKey, any>
export type FormFieldElementValidation = [StructError | undefined, any]

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export type ImageElementCacheType = CanvasDataURLType
export type ImageElementCrossOrigin = 'anonymous' | 'use-credentials'
export type ImageElementStatus = 'idle' | 'fetching' | 'loaded' | 'error'

export type InputElementTouchTrigger = 'blur' | 'change'

export type InputElementType =
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

export type InputElementValue = Date | number | string | string[] | Uint8Array | undefined

export type Layer = 0 | 1 | 2 | 3
export type Orientation = 'horizontal' | 'vertical'
export type Shape = 'circle' | 'rectangle' | 'square' | 'squircle'
export type Size = 'small' | 'medium' | 'large' | string | number

export type TextAreaElementTouchTrigger = InputElementTouchTrigger
export type TextAreaElementValue = string | string[] | undefined
export type TextAreaElementResize = 'both' | 'horizontal' | 'vertical' | 'none'

export type Theme = 'dark' | 'light' | 'system'

export type TypeaheadOnMatch<T extends HTMLElement> = (element: T) => any

export type WebSocketEventData<T extends object> = T | ArrayBufferLike | ArrayBufferView | Blob | string
