import type { Middleware, Placement, Platform, Strategy } from '@floating-ui/dom'
import type { FocusTarget, FocusTargetOrFalse } from 'focus-trap'
import type { Struct } from 'superstruct'
import { SelectOption } from './interfaces'
import {
  ButtonType,
  ButtonVariant,
  ChipElementVariant,
  ComboBoxElementAutoComplete,
  FocusTrapAllowOutsideClick,
  FocusTrapCheckCanFocusTrap,
  FocusTrapCheckCanReturnFocus,
  FocusTrapClickOutsideDeactivates,
  FocusTrapDisplayCheck,
  FocusTrapEscapeDeactivates,
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

export interface AccordionElementAttributes extends BaseElementAttributes {
  'allow-only-one-expanded-section'?: boolean
}

export interface AccordionHeaderElementAttributes extends BaseElementAttributes {
  level?: HeadingLevel
}

export interface AccordionButtonElementAttributes extends BaseElementAttributes {}
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

export interface ComboBoxElementAttributes extends BaseElementAttributes {
  autocomplete?: ComboBoxElementAutoComplete
  expanded?: boolean
  'scroll-into-view-options'?: ScrollIntoViewOptions
}

export interface ComboBoxButtonElementAttributes extends BaseElementAttributes {}
export interface ComboBoxGroupElementAttributes extends BaseElementAttributes {}
export interface ComboBoxInputElementAttributes extends BaseElementAttributes {}
export interface ComboBoxListElementAttributes extends FloatingElementAttributes {}

export interface ComboBoxOptionElementAttributes extends BaseElementAttributes {
  selected?: boolean
}

export interface DialogElementAttributes extends FocusTrapElementAttributes {
  description?: string
  label?: string
  visible?: boolean
}

export interface DialogDescriptionElementAttributes extends BaseElementAttributes {}
export interface DialogLabelElementAttributes extends BaseElementAttributes {}

export interface DisclosureElementAttributes extends BaseElementAttributes {}
export interface DisclosureButtonElementAttributes extends BaseElementAttributes {}
export interface DisclosurePanelElementAttributes extends BaseElementAttributes {}

export interface DisclosureSectionElementAttributes extends BaseElementAttributes {
  expanded?: boolean
}

export interface DividerElementAttributes extends BaseElementAttributes {
  orientation?: Orientation
}

export interface FloatingElementAttributes extends BaseElementAttributes {
  'ancestor-scroll'?: boolean
  'ancestor-resize'?: boolean
  'animation-frame'?: boolean
  'arrow-padding'?: number
  'element-resize'?: boolean
  middlewares?: Middleware[]
  placement?: Placement
  platform?: Platform
  strategy?: Strategy
}

export interface FocusTrapElementAttributes extends BaseElementAttributes {
  'allow-outside-click'?: FocusTrapAllowOutsideClick
  'check-can-focus-trap'?: FocusTrapCheckCanFocusTrap
  'check-can-return-focus'?: FocusTrapCheckCanReturnFocus
  'click-outside-deactivates'?: FocusTrapClickOutsideDeactivates
  'delay-initial-focus'?: boolean
  'display-check'?: FocusTrapDisplayCheck
  // document?: Document
  'escape-deactivates'?: FocusTrapEscapeDeactivates
  'fallback-focus'?: FocusTarget
  // get-shadow-root?: FocusTrapGetShadowRoot
  'initial-focus'?: FocusTargetOrFalse
  'prevent-scroll'?: boolean
  'return-focus-on-deactivate'?: boolean
  'set-return-focus'?: FocusTrapSetReturnFocus
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

export interface TabsElementAttributes extends BaseElementAttributes {
  'automatic-activation'?: boolean
}

export interface TabsTabElementAttributes extends BaseElementAttributes {
  selected?: boolean
}

export interface TabsPanelElementAttributes extends BaseElementAttributes {}

export interface TextAreaElementAttributes extends Omit<InputElementAttributes, 'obscured' | 'type'> {
  autosize?: boolean
  cols?: number
  resize?: TextAreaElementResize
  rows?: number
}

export interface TooltipElementAttributes extends BaseElementAttributes {
  focusable?: boolean
  visible?: boolean
}

export interface TooltipArrowElementAttributes extends BaseElementAttributes {}
export interface TooltipContentElementAttributes extends FloatingElementAttributes {}
export interface TooltipTriggerElementAttributes extends BaseElementAttributes {}
