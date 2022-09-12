import { IDGenerateOptions, ID_ALPHABET_HEX_LOWERCASE } from '@queelag/core'

/**
 * Elements
 */
export const ELEMENT_UID_GENERATE_OPTIONS: IDGenerateOptions = { alphabet: ID_ALPHABET_HEX_LOWERCASE, size: 8 }

/**
 * IconElement
 */
export const CACHE_ICONS: Map<string, string> = new Map()
export const DEFAULT_ICON_SVG_STRING: string = '<svg viewBox="0 0 0 0"></svg>'
export const FETCHING_ICONS: Set<string> = new Set()

/**
 * ImageElement
 */
export const CACHE_IMAGES: Map<string, string> = new Map()
export const DEFAULT_IMAGE_SIZE: string = '100%'
export const DEFAULT_IMAGE_SRC: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
export const FETCHING_IMAGES: Set<string> = new Set()

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
