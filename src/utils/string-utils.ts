import { isWindowNotDefined } from '@aracna/core'

/**
 * Checks if a string is a valid SVG.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/string)
 */
export function isStringSVG(string: string): boolean {
  let parser: DOMParser, document: Document, element: SVGSVGElement | null

  if (isWindowNotDefined()) {
    return false
  }

  parser = new DOMParser()
  document = parser.parseFromString(string, 'text/html')

  element = document.querySelector('svg')
  if (!element) return false

  return true
}
