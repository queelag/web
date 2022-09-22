import type { Middleware, Placement, Platform, Strategy } from '@floating-ui/dom'
import type { FocusTarget, FocusTargetOrFalse } from 'focus-trap'
import type { Struct } from 'superstruct'
import { IconElementSanitizeConfig, SelectOption } from './interfaces'
import {
  AriaComboBoxElementAutoComplete,
  ButtonPressed,
  ButtonType,
  ButtonVariant,
  ChipElementVariant,
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

export interface AriaAccordionElementAttributes extends BaseElementAttributes {
  'allow-only-one-expanded-section'?: boolean
}

export interface AriaAccordionHeaderElementAttributes extends BaseElementAttributes {
  level?: HeadingLevel
}

export interface AriaAccordionButtonElementAttributes extends BaseElementAttributes {}
export interface AriaAccordionPanelElementAttributes extends BaseElementAttributes {}

export interface AriaAccordionSectionElementAttributes extends BaseElementAttributes {
  collapsable?: boolean
  expanded?: boolean
  'header-button-id'?: string
  'panel-id'?: string
}

export interface AriaAlertElementAttributes extends BaseElementAttributes {
  closable?: boolean
  headline?: string
  icon?: string
  text?: string
}

export interface AriaAlertDialogElementAttributes extends AriaDialogElementAttributes {}
export interface AriaAlertDialogDescriptionElementAttributes extends AriaDialogDescriptionElementAttributes {}
export interface AriaAlertDialogLabelElementAttributes extends AriaDialogLabelElementAttributes {}

export interface AriaBreadcrumbElementAttributes extends BaseElementAttributes {}
export interface AriaBreadcrumbListElementAttributes extends BaseElementAttributes {}

export interface AriaBreadcrumbListItemElementAttributes extends BaseElementAttributes {
  current?: boolean
}

export interface AriaButtonElementAttributes extends BaseElementAttributes {
  disabled?: boolean
  pressed?: ButtonPressed
}

export interface AriaCarouselElementAttributes extends BaseElementAttributes {
  'automatic-rotation'?: boolean
  'infinite-rotation'?: boolean
  'automatic-rotation-interval-time'?: number
}

export interface AriaCarouselNextSlideControlElementAttributes extends BaseElementAttributes {}
export interface AriaCarouselPreviousSlideControlElementAttributes extends BaseElementAttributes {}
export interface AriaCarouselRotationControlElementAttributes extends BaseElementAttributes {}

export interface AriaCarouselSlideElementAttributes extends BaseElementAttributes {
  active?: boolean
}

export interface AriaCarouselSlidesElementAttributes extends BaseElementAttributes {}

export interface AriaCarouselTabElementAttributes extends BaseElementAttributes {
  active?: boolean
}

export interface AriaCarouselTabsElementAttributes extends BaseElementAttributes {}

export interface AriaComboBoxElementAttributes extends BaseElementAttributes {
  autocomplete?: AriaComboBoxElementAutoComplete
  expanded?: boolean
  'scroll-into-view-options'?: ScrollIntoViewOptions
}

export interface AriaComboBoxButtonElementAttributes extends BaseElementAttributes {}
export interface AriaComboBoxGroupElementAttributes extends BaseElementAttributes {}
export interface AriaComboBoxInputElementAttributes extends BaseElementAttributes {}
export interface AriaComboBoxListElementAttributes extends FloatingElementAttributes {}

export interface AriaComboBoxOptionElementAttributes extends BaseElementAttributes {
  selected?: boolean
}

export interface AriaDialogElementAttributes extends FocusTrapElementAttributes {
  description?: string
  label?: string
  visible?: boolean
}

export interface AriaDialogDescriptionElementAttributes extends BaseElementAttributes {}
export interface AriaDialogLabelElementAttributes extends BaseElementAttributes {}

export interface AriaDisclosureElementAttributes extends BaseElementAttributes {}
export interface AriaDisclosureButtonElementAttributes extends BaseElementAttributes {}
export interface AriaDisclosurePanelElementAttributes extends BaseElementAttributes {}

export interface AriaDisclosureSectionElementAttributes extends BaseElementAttributes {
  expanded?: boolean
}

export interface AriaFeedElementAttributes extends BaseElementAttributes {
  busy?: boolean
}

export interface AriaFeedArticleElementAttributes extends BaseElementAttributes {}
export interface AriaFeedArticleDescriptionElementAttributes extends BaseElementAttributes {}
export interface AriaFeedArticleLabelElementAttributes extends BaseElementAttributes {}

export interface AriaLinkElementAttributes extends BaseElementAttributes {
  href?: string
  target?: string
}

export interface AriaListBoxElementAttributes extends BaseElementAttributes {
  multiple?: boolean
  'select-first-option-on-focus'?: boolean
  'selection-follows-focus'?: boolean
}

export interface AriaListBoxOptionElementAttributes extends BaseElementAttributes {
  selected?: boolean
}

export interface AriaMenuElementAttributes extends BaseElementAttributes {
  expanded?: boolean
  // navigation?: boolean
}

export interface AriaMenuButtonElementAttributes extends BaseElementAttributes {}
export interface AriaMenuListElementAttributes extends FloatingElementAttributes {}

export interface AriaMenuItemElementAttributes extends BaseElementAttributes {
  active?: boolean
}

export interface AriaMenuBarElementAttributes extends BaseElementAttributes {}

export interface AriaMenuBarItemElementAttributes extends BaseElementAttributes {
  focused?: boolean
}

export interface AriaMenuBarSubMenuElementAttributes extends FloatingElementAttributes {
  expanded?: boolean
}

export interface AriaRadioGroupElementAttributes extends BaseElementAttributes {}

export interface AriaSliderElementAttributes extends BaseElementAttributes {
  decimals?: number
  'disable-swap'?: boolean
  maximum?: number
  minimum?: number
  'minimum-distance'?: number
  orientation?: Orientation
  step?: number
}

export interface AriaSliderThumbElementAttributes extends BaseElementAttributes {
  'default-value'?: number
  'disable-compute-position'?: boolean
  movable?: boolean
  value?: number
}

export interface AriaTabsElementAttributes extends BaseElementAttributes {
  'automatic-activation'?: boolean
}

export interface AriaTabsTabElementAttributes extends BaseElementAttributes {
  selected?: boolean
}

export interface AriaTabsPanelElementAttributes extends BaseElementAttributes {}

export interface AriaTooltipElementAttributes extends BaseElementAttributes {
  focusable?: boolean
  visible?: boolean
}

export interface AriaTooltipArrowElementAttributes extends BaseElementAttributes {}
export interface AriaTooltipContentElementAttributes extends FloatingElementAttributes {}
export interface AriaTooltipTriggerElementAttributes extends BaseElementAttributes {}

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

export interface ButtonElementAttributes extends AriaButtonElementAttributes {
  async?: boolean
  icon?: string
  label?: string
  native?: boolean
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

export interface ChipElementAttributes extends BaseElementAttributes {
  icon?: string
  image?: string
  label?: string
  'leading-icon'?: string
  'trailing-icon'?: string
  variant?: ChipElementVariant
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
  sanitize?: boolean
  'sanitize-config'?: IconElementSanitizeConfig
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

export interface ListElementAttributes extends BaseElementAttributes {
  items: any[]
}

export interface ListItemElementAttributes extends BaseElementAttributes {
  headline?: string
  icon?: string
  image?: string
  text?: string
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

export interface AriaRadioButtonElementAttributes extends BaseElementAttributes {
  checked?: boolean
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
