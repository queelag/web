import { FocusTarget, FocusTargetOrFalse } from 'focus-trap'
import type { Struct } from 'superstruct'
import { SelectOption } from './interfaces'
import {
  ButtonType,
  ButtonVariant,
  ChipElementVariant,
  FocusTrapAllowOutsideClick,
  FocusTrapCheckCanFocusTrap,
  FocusTrapCheckCanReturnFocus,
  FocusTrapClickOutsideDeactivates,
  FocusTrapDisplayCheck,
  FocusTrapEscapeDeactivates,
  FocusTrapGetShadowRoot,
  FocusTrapSetReturnFocus,
  HeadingLevel,
  ImageElementCacheType,
  InputElementTouchTrigger,
  InputElementType,
  Layer,
  Orientation,
  Shape,
  Size,
  TextAreaElementResize
} from './types'

export interface AccordionElementAttributes extends BaseElementAttributes {}

export interface AccordionHeaderElementAttributes extends BaseElementAttributes {
  level?: HeadingLevel
}

export interface AccordionHeaderButtonElementAttributes extends BaseElementAttributes {}
export interface AccordionPanelElementAttributes extends BaseElementAttributes {}

export interface AccordionSectionElementAttributes extends BaseElementAttributes {
  collapsable?: boolean
  expanded?: boolean
  'header-button-id'?: string
  'panel-id'?: string
}

export interface AlertElementAttributes extends BaseElementAttributes {
  closable?: boolean
  headline?: string
  icon?: string
  text?: string
}

export interface AlertDialogElementAttributes extends DialogElementAttributes {}
export interface AlertDialogDescriptionElementAttributes extends DialogDescriptionElementAttributes {}
export interface AlertDialogLabelElementAttributes extends DialogLabelElementAttributes {}

export interface AvatarElementAttributes extends BaseElementAttributes {
  icon?: string
  image?: string
  text?: string
}

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

export interface BreadcrumbElementAttributes extends BaseElementAttributes {}

export interface BreadcrumbAnchorElementAttributes extends LinkElementAttributes {
  current?: boolean
}

export interface BreadcrumbListElementAttributes extends BaseElementAttributes {}
export interface BreadcrumbListItemElementAttributes extends BaseElementAttributes {}

export interface ButtonElementAttributes extends BaseElementAttributes {
  async?: boolean
  disabled?: boolean
  icon?: boolean
  label?: string
  native?: boolean
  normalized?: boolean
  pressed?: boolean
  spinning?: boolean
  'tab-index'?: number
  type?: ButtonType
  variant?: ButtonVariant
}

export interface CheckBoxElementAttributes extends FormFieldElementAttributes {
  custom?: boolean
  native?: boolean
  normalized?: boolean
}

export interface ChipElementAttributes extends BaseElementAttributes {
  icon?: string
  image?: string
  label?: string
  'leading-icon'?: string
  'trailing-icon'?: string
  variant?: ChipElementVariant
}

export interface DialogElementAttributes extends FocusTrapElementAttributes {
  description?: string
  label?: string
  visible?: boolean
}

export interface DialogDescriptionElementAttributes extends BaseElementAttributes {}
export interface DialogLabelElementAttributes extends BaseElementAttributes {}

export interface DividerElementAttributes extends BaseElementAttributes {
  orientation?: Orientation
}

export interface FocusTrapElementAttributes extends BaseElementAttributes {
  'focus-trap-allow-outside-click'?: FocusTrapAllowOutsideClick
  'focus-trap-check-can-focus-trap'?: FocusTrapCheckCanFocusTrap
  'focus-trap-check-can-return-focus'?: FocusTrapCheckCanReturnFocus
  'focus-trap-click-outside-deactivates'?: FocusTrapClickOutsideDeactivates
  'focus-trap-delay-initial-focus'?: boolean
  'focus-trap-display-check'?: FocusTrapDisplayCheck
  'focus-trap-document'?: Document
  'focus-trap-escape-deactivates'?: FocusTrapEscapeDeactivates
  'focus-trap-fallback-focus'?: FocusTarget
  'focus-trap-get-shadow-root'?: FocusTrapGetShadowRoot
  'focus-trap-initial-focus'?: FocusTargetOrFalse
  'focus-trap-prevent-scroll'?: boolean
  'focus-trap-return-focus-on-deactivate'?: boolean
  'focus-trap-set-return-focus'?: FocusTrapSetReturnFocus
}

export interface FormElementAttributes extends BaseElementAttributes {}

export interface FormFieldElementAttributes extends BaseElementAttributes {
  disabled?: boolean
  path?: string
  readonly?: boolean
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
  'cache-quality'?: number
  'cache-type'?: ImageElementCacheType
  'cross-origin'?: string
  eager?: boolean
  lazy?: boolean
  src: string
}

export interface InputElementAttributes extends FormFieldElementAttributes {
  autofocus?: boolean
  multiple?: boolean
  normalized?: boolean
  obscured?: boolean
  padding?: string
  placeholder?: string
  'touch-trigger'?: InputElementTouchTrigger
  type: InputElementType
}

export interface InputFileElementAttributes extends FormFieldElementAttributes {
  'deserialize-file-resolve-array-buffer'?: boolean
  'deserialize-file-resolve-text'?: boolean
  multiple?: boolean
  native?: boolean
}

export interface LinkElementAttributes extends BaseElementAttributes {
  href?: string
  'tab-index'?: number
  target?: string
}

export interface ListBoxElementAttributes extends BaseElementAttributes {
  multiple?: boolean
  'select-on-focus'?: boolean
}

export interface ListBoxOptionElementAttributes extends BaseElementAttributes {
  selected?: boolean
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

export interface NavigationBarElementAttributes extends BaseElementAttributes {
  'active-item'?: string
  items?: NavigationBarItemElementAttributes[]
}

export interface NavigationBarItemElementAttributes extends BaseElementAttributes {
  active?: boolean
  label?: string
  icon?: string
}

export interface NavigationRailElementAttributes extends BaseElementAttributes {
  'active-item'?: string
  items?: NavigationRailItemElementAttributes[]
}

export interface NavigationRailItemElementAttributes extends BaseElementAttributes {
  active?: boolean
  label?: string
  icon?: string
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
  resize?: TextAreaElementResize
  rows?: number
}
