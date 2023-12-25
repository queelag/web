import { isDocumentNotDefined, tc } from '@aracna/core'
import { ElementAttributeValue } from '../definitions/types.js'
import { getWindowBoundingClientRect } from './window-utils.js'

export function defineCustomElement(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void | Error {
  let element: CustomElementConstructor | undefined | Error

  element = tc(() => customElements.get(name), false)
  if (element instanceof Error) return element

  if (element) {
    return new Error(`The element ${name} is already defined.`)
  }

  return tc(() => customElements.define(name, constructor, options), false)
}

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

export function joinElementClasses(...classes: any[]): string {
  return classes.filter(Boolean).join(' ')
}

export function setElementAttribute<T extends Element>(element: T, name: string, value: ElementAttributeValue): void {
  if (typeof value !== 'string') {
    return element.removeAttribute(name)
  }

  element.setAttribute(name, value)
}

export function setElementAttributes<T extends Element>(element: T, attributes: Record<string, ElementAttributeValue>): void {
  for (let name in attributes) {
    setElementAttribute(element, name, attributes[name])
  }
}

export function removeElementAttribute<T extends Element>(element: T, name: string): void {
  return element.removeAttribute(name)
}

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

export function setImmutableElementAttributes<T extends Element>(element: T, attributes: Record<string, ElementAttributeValue>): void {
  for (let name in attributes) {
    setImmutableElementAttribute(element, name, attributes[name])
  }
}

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

export function isElementFocused<T extends Element>(element: T): boolean {
  if (isDocumentNotDefined()) {
    return false
  }

  return element === document.activeElement
}
