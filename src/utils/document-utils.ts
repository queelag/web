import { isDocumentDefined } from '@aracna/core'

/**
 * Creates an instance of the element for the specified tag.
 * The difference with the native `document.createElement` is that this function is isomorphic.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/document)
 */
export function createDocumentElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K]
export function createDocumentElement<K extends keyof SVGElementTagNameMap>(tagName: K, options?: ElementCreationOptions): SVGElementTagNameMap[K]
export function createDocumentElement<K1 extends keyof HTMLElementTagNameMap, K2 extends keyof SVGElementTagNameMap>(
  tagName: K1 | K2,
  options?: ElementCreationOptions
): HTMLElementTagNameMap[K1] | SVGElementTagNameMap[K2] {
  return isDocumentDefined() ? document.createElement(tagName, options) : ({} as any)
}
