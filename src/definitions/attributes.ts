import type { Middleware, Placement, Platform, Strategy } from '@floating-ui/dom'
import type { FocusTarget, FocusTargetOrFalse } from 'focus-trap'
import { IconElementSanitizeConfig, RadioButton, SelectOption } from './interfaces'
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
  FormFieldElementSchema,
  FormFieldElementTarget,
  HeadingLevel,
  ImageElementCacheType,
  InputElementTouchTrigger,
  InputElementType,
  InputElementValue,
  Layer,
  Orientation,
  Shape,
  Size,
  TextAreaElementResize,
  TextAreaElementTouchTrigger,
  TypeaheadPredicate
} from './types'

/**
 * ARIA Elements
 */
/** */

export interface AriaAccordionElementAttributes extends BaseElementAttributes {
  'allow-only-one-expanded-section'?: boolean
}

export interface AriaAccordionHeaderElementAttributes extends BaseElementAttributes {
  level?: HeadingLevel
}

export interface AriaAccordionButtonElementAttributes extends BaseElementAttributes {}
export interface AriaAccordionPanelElementAttributes extends BaseElementAttributes {}

export interface AriaAccordionSectionElementAttributes extends BaseElementAttributes {
  expanded?: boolean
  noncollapsible?: boolean
}

export interface AriaAlertElementAttributes extends BaseElementAttributes {}

export interface AriaAlertDialogElementAttributes extends AriaDialogElementAttributes {}
export interface AriaAlertDialogDescriptionElementAttributes extends AriaDialogDescriptionElementAttributes {}
export interface AriaAlertDialogLabelElementAttributes extends AriaDialogLabelElementAttributes {}

export interface AriaBreadcrumbElementAttributes extends BaseElementAttributes {}
export interface AriaBreadcrumbListElementAttributes extends BaseElementAttributes {}

export interface AriaBreadcrumbItemElementAttributes extends BaseElementAttributes {
  current?: boolean
}

export interface AriaButtonElementAttributes extends BaseElementAttributes {
  disabled?: boolean
  native?: boolean
  pressed?: ButtonPressed
}

export interface AriaCarouselElementAttributes extends BaseElementAttributes {
  'automatic-rotation'?: boolean
  'automatic-rotation-interval-time'?: number
  'infinite-rotation'?: boolean
  'reverse-rotation'?: boolean
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

export interface AriaCheckBoxElementAttributes extends FormFieldElementAttributes {
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
}

export interface AriaComboBoxElementAttributes<T> extends FormFieldElementAttributes, TypeaheadElementAttributes<T> {
  autocomplete?: AriaComboBoxElementAutoComplete
  expanded?: boolean
  multiple?: boolean
  'scroll-into-view-options'?: ScrollIntoViewOptions
}

export interface AriaComboBoxButtonElementAttributes extends BaseElementAttributes {}
export interface AriaComboBoxGroupElementAttributes extends BaseElementAttributes {}
export interface AriaComboBoxInputElementAttributes extends BaseElementAttributes {}
export interface AriaComboBoxListElementAttributes extends FloatingElementAttributes {}

export interface AriaComboBoxOptionElementAttributes extends BaseElementAttributes {
  focused?: boolean
  selected?: boolean
  value?: any
}

export interface AriaDialogElementAttributes extends FocusTrapElementAttributes {
  'lock-body-scroll'?: boolean
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

export interface AriaFeedArticleElementAttributes extends BaseElementAttributes {
  focused?: boolean
}

export interface AriaFeedArticleDescriptionElementAttributes extends BaseElementAttributes {}
export interface AriaFeedArticleLabelElementAttributes extends BaseElementAttributes {}

export interface AriaLinkElementAttributes extends BaseElementAttributes {
  href?: string
  target?: string
}

export interface AriaListBoxElementAttributes<T> extends TypeaheadElementAttributes<T> {
  multiple?: boolean
  'select-first-option-on-focus'?: boolean
  'selection-follows-focus'?: boolean
}

export interface AriaListBoxOptionElementAttributes extends BaseElementAttributes {
  focused?: boolean
  selected?: boolean
  value?: any
}

export interface AriaMenuElementAttributes<T> extends TypeaheadElementAttributes<T> {
  'collapse-debounce-time'?: number
  'collapse-on-mouse-leave'?: boolean
  'expand-on-mouse-enter'?: boolean
}

export interface AriaMenuButtonElementAttributes extends BaseElementAttributes {}

export interface AriaMenuItemElementAttributes extends BaseElementAttributes {
  focused?: boolean
  label?: string
}

export interface AriaMenuSubMenuElementAttributes extends FloatingElementAttributes {
  expanded?: boolean
}

export interface AriaMeterElementAttributes extends BaseElementAttributes {
  max?: number
  min?: number
  native?: boolean
}

export interface AriaRadioButtonElementAttributes extends BaseElementAttributes {
  checked?: boolean
}

export interface AriaRadioGroupElementAttributes extends BaseElementAttributes {}

export interface AriaSliderElementAttributes extends FormFieldElementAttributes {
  decimals?: number
  'disable-swap'?: boolean
  max?: number
  min?: number
  'min-distance'?: number
  orientation?: Orientation
  step?: number
}

export interface AriaSliderThumbElementAttributes extends BaseElementAttributes {
  'default-value'?: number
  'disable-compute-position'?: boolean
  movable?: boolean
  value?: number
}

export interface AriaSwitchElementAttributes extends FormFieldElementAttributes {
  on?: boolean
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
  'show-on-mouse-enter'?: boolean
  visible?: boolean
}

export interface AriaTooltipArrowElementAttributes extends BaseElementAttributes {}
export interface AriaTooltipContentElementAttributes extends FloatingElementAttributes {}
export interface AriaTooltipTriggerElementAttributes extends BaseElementAttributes {}

/**
 * Core Elements
 */
/** */

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

export interface FormFieldElementAttributes extends BaseElementAttributes {
  disabled?: boolean
  focused?: boolean
  native?: boolean
  normalized?: boolean
  path?: string
  readonly?: boolean
  schema?: FormFieldElementSchema
  target?: FormFieldElementTarget
  touched?: boolean
  value?: any
}

export interface TypeaheadElementAttributes<T> extends BaseElementAttributes {
  'typeahead-debounce-time'?: number
  'typeahead-predicate'?: TypeaheadPredicate<T>
}

/**
 * Data Elements
 */
/** */

export interface AvatarElementAttributes extends BaseElementAttributes {
  icon?: string
  image?: string
  text?: string
}

export interface BadgeElementAttributes extends BaseElementAttributes {
  max?: number
  min?: number
  numeric?: boolean
  value?: number | string
}

export interface CarouselElementAttributes extends AriaCarouselElementAttributes {}
export interface CarouselNextSlideControlElementAttributes extends AriaCarouselNextSlideControlElementAttributes {}
export interface CarouselPreviousSlideControlElementAttributes extends AriaCarouselPreviousSlideControlElementAttributes {}
export interface CarouselRotationControlElementAttributes extends AriaCarouselRotationControlElementAttributes {}
export interface CarouselSlideElementAttributes extends AriaCarouselSlideElementAttributes {}
export interface CarouselSlidesElementAttributes extends AriaCarouselSlidesElementAttributes {}
export interface CarouselTabElementAttributes extends AriaCarouselTabElementAttributes {}
export interface CarouselTabsElementAttributes extends AriaCarouselTabsElementAttributes {}

export interface ChipElementAttributes extends BaseElementAttributes {
  icon?: string
  image?: string
  label?: string
  'leading-icon'?: string
  'trailing-icon'?: string
  variant?: ChipElementVariant
}

export interface FeedElementAttributes extends AriaFeedElementAttributes {}
export interface FeedArticleElementAttributes extends AriaFeedArticleElementAttributes {}
export interface FeedArticleDescriptionElementAttributes extends AriaFeedArticleDescriptionElementAttributes {}
export interface FeedArticleLabelElementAttributes extends AriaFeedArticleLabelElementAttributes {}

export interface IconElementAttributes extends BaseElementAttributes {
  cache?: boolean
  color?: string
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
  placeholder?: string
  src: string
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

export interface TooltipElementAttributes extends AriaTooltipElementAttributes {}
export interface TooltipArrowElementAttributes extends AriaTooltipArrowElementAttributes {}
export interface TooltipContentElementAttributes extends AriaTooltipContentElementAttributes {}
export interface TooltipTriggerElementAttributes extends AriaTooltipTriggerElementAttributes {}

/**
 * Feedback Elements
 */
/** */

export interface AlertElementAttributes extends AriaAlertElementAttributes {}

export interface AlertDialogElementAttributes extends AriaAlertDialogElementAttributes {}
export interface AlertDialogDescriptionElementAttributes extends AriaAlertDialogDescriptionElementAttributes {}
export interface AlertDialogLabelElementAttributes extends AriaAlertDialogLabelElementAttributes {}

export interface DialogElementAttributes extends AriaDialogElementAttributes {
  description?: string
  label?: string
}

export interface DialogDescriptionElementAttributes extends AriaDialogDescriptionElementAttributes {}
export interface DialogLabelElementAttributes extends AriaDialogLabelElementAttributes {}

export interface MeterElementAttributes extends AriaMeterElementAttributes {
  low?: number
  high?: number
  optimum?: number
  round?: boolean
}

/**
 * Input Elements
 */
/** */

export interface ButtonElementAttributes extends AriaButtonElementAttributes {
  async?: boolean
  icon?: string
  label?: string
  normalized?: boolean
  spinning?: boolean
  type?: ButtonType
  variant?: ButtonVariant
}

export interface ButtonGroupElementAttributes extends BaseElementAttributes {
  buttons?: ButtonElementAttributes[]
}

export interface CheckBoxElementAttributes extends AriaCheckBoxElementAttributes {
  value?: boolean
}

export interface FormElementAttributes extends BaseElementAttributes {
  async?: boolean
  disabled?: boolean
  spinning?: boolean
}

export interface InputElementAttributes extends FormFieldElementAttributes {
  autofocus?: boolean
  multiple?: boolean
  obscured?: boolean
  padding?: string
  placeholder?: string
  'touch-trigger'?: InputElementTouchTrigger
  type?: InputElementType
  value?: InputElementValue
}

export interface InputFileElementAttributes extends FormFieldElementAttributes {
  'deserialize-file-resolve-array-buffer'?: boolean
  'deserialize-file-resolve-text'?: boolean
  multiple?: boolean
}

export interface RadioButtonElementAttributes extends AriaRadioButtonElementAttributes {
  label?: string
  value?: any
}

export interface RadioGroupElementAttributes extends AriaRadioGroupElementAttributes {
  buttons?: RadioButton[]
}

export interface SelectElementAttributes<T> extends AriaComboBoxElementAttributes<T> {
  options?: SelectOption[]
  value?: any | any[]
}

export interface SelectButtonElementAttributes extends AriaComboBoxButtonElementAttributes {}
export interface SelectGroupElementAttributes extends AriaComboBoxGroupElementAttributes {}
export interface SelectInputElementAttributes extends AriaComboBoxInputElementAttributes {}
export interface SelectListElementAttributes extends AriaComboBoxListElementAttributes {}

export interface SelectOptionElementAttributes extends AriaComboBoxOptionElementAttributes {
  label?: string
}

export interface SliderElementAttributes extends AriaSliderElementAttributes {
  value?: number | number[]
}

export interface SliderThumbElementAttributes extends AriaSliderThumbElementAttributes {}

export interface SwitchElementAttributes extends AriaSwitchElementAttributes {
  value?: boolean
}

export interface TextAreaElementAttributes extends FormFieldElementAttributes {
  autosize?: boolean
  cols?: number
  multiple?: boolean
  padding?: boolean
  placeholder?: string
  resize?: TextAreaElementResize
  rows?: number
  'touch-trigger'?: TextAreaElementTouchTrigger
}

/**
 * Layout Elements
 */
/** */

export interface DividerElementAttributes extends BaseElementAttributes {
  orientation?: Orientation
}

/**
 * Navigation Elements
 */
/** */

export interface BreadcrumbElementAttributes extends AriaBreadcrumbElementAttributes {}
export interface BreadcrumbItemElementAttributes extends AriaBreadcrumbItemElementAttributes {}
export interface BreadcrumbListElementAttributes extends AriaBreadcrumbListElementAttributes {}

export interface MenuElementAttributes<T> extends AriaMenuElementAttributes<T> {}
export interface MenuButtonElementAttributes extends AriaMenuButtonElementAttributes {}
export interface MenuItemElementAttributes extends AriaMenuItemElementAttributes {}
export interface MenuSubMenuElementAttributes extends AriaMenuSubMenuElementAttributes {}

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

export interface TabsElementAttributes extends AriaTabsElementAttributes {}
export interface TabsPanelElementAttributes extends AriaTabsPanelElementAttributes {}
export interface TabsTabElementAttributes extends AriaTabsTabElementAttributes {}

/**
 * Surface Elements
 */
/** */

export interface AccordionElementAttributes extends AriaAccordionElementAttributes {}
export interface AccordionButtonElementAttributes extends AriaAccordionButtonElementAttributes {}
export interface AccordionHeaderElementAttributes extends AriaAccordionHeaderElementAttributes {}
export interface AccordionPanelElementAttributes extends AriaAccordionPanelElementAttributes {}
export interface AccordionSectionElementAttributes extends AriaAccordionSectionElementAttributes {}

export interface DisclosureElementAttributes extends AriaDisclosureElementAttributes {}
export interface DisclosureButtonElementAttributes extends AriaDisclosureButtonElementAttributes {}
export interface DisclosurePanelElementAttributes extends AriaDisclosurePanelElementAttributes {}
export interface DisclosureSectionElementAttributes extends AriaDisclosureSectionElementAttributes {}
