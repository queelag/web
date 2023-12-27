import { isDocumentNotDefined, tc } from '@aracna/core'
import { ElementAttributeValue } from '../definitions/types.js'
import { jec } from '../functions/jec.js'
import { getWindowBoundingClientRect } from './window-utils.js'

/**
 * Defines a custom element.
 * The difference with the native `customElements.define` is that this function does not throw an error if the element is already defined.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function defineCustomElement(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void | Error {
  let element: CustomElementConstructor | undefined | Error

  element = tc(() => customElements.get(name), false)
  if (element instanceof Error) return element

  if (element) {
    return new Error(`The element ${name} is already defined.`)
  }

  return tc(() => customElements.define(name, constructor, options), false)
}

/**
 * Returns a compatible value for the `style` attribute of an element.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function getElementStyleCompatibleValue(value: any): string | undefined {
  switch (typeof value) {
    case 'number':
      return value + 'px'
    case 'string':
      if (/^[0-9.]{1,32}$/.test(value)) {
        return value + 'px'
      }

      return value
    default:
      return undefined
  }
}

/**
 * @deprecated
 */
export function joinElementClasses(...classes: any[]): string {
  return jec()
}

/**
 * Removes an attribute from an element.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function removeElementAttribute<T extends Element>(element: T, name: string): void {
  return element.removeAttribute(name)
}

/**
 * Removes an immutable attribute from an element.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function removeImmutableElementAttribute<T extends Element>(element: T, name: string): void {
  if (typeof element !== 'object') {
    return
  }

  if (name in element) {
    // @ts-ignore
    delete element[name]
  }

  element.removeAttribute(name)
}

/**
 * Scrolls an element into view.
 * Optionally the behavior and logical position can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function scrollElementIntoView<T extends Element, U extends HTMLElement>(parent: T | Window, element: U, options?: ScrollIntoViewOptions): void {
  let block: ScrollLogicalPosition, inline: ScrollLogicalPosition, pstyle: DOMRect, estyle: DOMRect, left: number | undefined, top: number | undefined

  block = options?.block ?? 'center'
  inline = options?.block ?? 'center'

  pstyle = parent instanceof Element ? parent.getBoundingClientRect() : getWindowBoundingClientRect()
  estyle = element.getBoundingClientRect()

  switch (block) {
    case 'center':
      top = element.offsetTop - (pstyle.height - estyle.height) / 2
      break
    case 'end':
      top = element.offsetTop - pstyle.height + estyle.height
      break
    default:
      top = element.offsetTop
      break
  }

  switch (inline) {
    case 'center':
      left = element.offsetLeft - (pstyle.width - estyle.width) / 2
      break
    case 'end':
      left = element.offsetLeft - pstyle.width + estyle.width
      break
    default:
      left = element.offsetLeft
      break
  }

  parent.scrollTo({ behavior: options?.behavior, left, top })
}

/**
 * Sets an attribute to an element.
 * The attribute is removed if the value is not a string.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function setElementAttribute<T extends Element>(element: T, name: string, value: ElementAttributeValue): void {
  if (typeof value !== 'string') {
    return element.removeAttribute(name)
  }

  element.setAttribute(name, value)
}

/**
 * Sets multiple attributes to an element.
 * The attributes with a value that is not a string are removed.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function setElementAttributes<T extends Element>(element: T, attributes: Record<string, ElementAttributeValue>): void {
  for (let name in attributes) {
    setElementAttribute(element, name, attributes[name])
  }
}

/**
 * Sets an immutable attribute to an element.
 * The attribute is removed if the value is not a string.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function setImmutableElementAttribute<T extends Element>(element: T, name: string, value: ElementAttributeValue): void {
  if (typeof element !== 'object') {
    return
  }

  if (typeof value !== 'string') {
    return removeImmutableElementAttribute(element, name)
  }

  Object.defineProperty(element, name, { configurable: true, enumerable: false, get: () => value, set: () => undefined })
  element.setAttribute(name, value)
}

/**
 * Sets multiple immutable attributes to an element.
 * The attributes with a value that is not a string are removed.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function setImmutableElementAttributes<T extends Element>(element: T, attributes: Record<string, ElementAttributeValue>): void {
  for (let name in attributes) {
    setImmutableElementAttribute(element, name, attributes[name])
  }
}

/**
 * Checks if an element is focused.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/element)
 */
export function isElementFocused<T extends Element>(element: T): boolean {
  if (isDocumentNotDefined()) {
    return false
  }

  return element === document.activeElement
}
