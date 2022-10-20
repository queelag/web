import { IDGenerateOptions, ID_ALPHABET_HEX_LOWERCASE } from '@queelag/core'
import { IconElementSanitizeConfig } from './interfaces'
import { InputElementType, Orientation, TypeaheadPredicate } from './types'

/**
 * AriaCarouselElement
 */
export const DEFAULT_CAROUSEL_ROTATION_DURATION: number = 2500

/**
 * AriaComboBoxElement and SelectElement
 */
export const DEFAULT_COMBOBOX_TYPEAHEAD_PREDICATE: TypeaheadPredicate<{ value?: any }> = (element: { value?: any }, value: string) =>
  String(element.value).toLowerCase().includes(value.toLowerCase().trim())

/**
 * AriaListBoxElement
 */
export const DEFAULT_LISTBOX_TYPEAHEAD_PREDICATE: TypeaheadPredicate<{ value?: any }> = (element: { value?: any }, value: string) =>
  String(element.value).toLowerCase().includes(value.toLowerCase().trim())

/**
 * AriaMenuElement
 */
export const DEFAULT_MENU_TYPEAHEAD_PREDICATE: TypeaheadPredicate<{ label?: any }> = (element: { label?: any }, value: string) =>
  String(element.label).toLowerCase().includes(value.toLowerCase().trim())

/**
 * AriaMeterElement and MeterElement
 */
export const DEFAULT_METER_MAX: number = 1
export const DEFAULT_METER_MIN: number = 0
export const DEFAULT_METER_VALUE: number = 0

/**
 * AriaSliderElement and SliderElement
 */
export const DEFAULT_SLIDER_DECIMALS: number = 0
export const DEFAULT_SLIDER_MAX: number = 100
export const DEFAULT_SLIDER_MIN: number = 0
export const DEFAULT_SLIDER_MIN_DISTANCE: number = 0
export const DEFAULT_SLIDER_ORIENTATION: Orientation = 'horizontal'
export const DEFAULT_SLIDER_STEP: number = 1
export const DEFAULT_SLIDER_THUMB_VALUE: number = 0

/**
 * BadgeElement
 */
export const DEFAULT_BADGE_MAX: number = 99
export const DEFAULT_BADGE_MIN: number = 0

/**
 * Elements
 */
export const ELEMENT_UID_GENERATE_OPTIONS: IDGenerateOptions = { alphabet: ID_ALPHABET_HEX_LOWERCASE, size: 8 }

/**
 * IconElement
 */
export const CACHE_ICONS: Map<string, string> = new Map()
export const DEFAULT_ICON_SVG_STRING: string = '<svg viewBox="0 0 0 0"></svg>'
export const DEFAULT_ICON_SANITIZE_CONFIG: IconElementSanitizeConfig = { RETURN_DOM: false, RETURN_DOM_FRAGMENT: false }
export const FETCHING_ICONS: Set<string> = new Set()

/**
 * ImageElement
 */
export const CACHE_IMAGES: Map<string, string> = new Map()
export const DEFAULT_IMAGE_SIZE: string = '100%'
export const DEFAULT_IMAGE_SRC: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
export const FETCHING_IMAGES: Set<string> = new Set()

/**
 * InputElement
 */
export const DEFAULT_INPUT_TYPE: InputElementType = 'text'

/**
 * Squircle
 */
export const CACHE_SQUIRCLES: Map<string, string> = new Map()
export const DEFAULT_SQUIRCLE_CURVATURE: number = 0.75
export const SQUIRCLES_CONTAINER_ID: string = 'squircles'

/**
 * SVG
 */
export const SVG_NAMESPACE_URI: 'http://www.w3.org/2000/svg' = 'http://www.w3.org/2000/svg'

/**
 * Typeahead
 */
export const DEFAULT_TYPEAHEAD_DEBOUNCE_TIME: number = 100
