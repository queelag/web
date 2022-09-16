import { ElementAttributes, ElementAttributeValue } from '@/definitions/types'

export function joinElementClasses(...classes: any[]): string {
  return classes.filter(Boolean).join(' ')
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

export function setElementAttribute<T extends Element>(element: T, name: string, value: ElementAttributeValue): void {
  if (typeof value !== 'string') {
    return element.removeAttribute(name)
  }

  element.setAttribute(name, value)
}
export function setImmutableElementAttribute<T extends Element>(element: T, name: string, value: ElementAttributeValue): void {
  if (typeof value !== 'string') {
    return removeImmutableElementAttribute(element, name)
  }

  Object.defineProperty(element, name, { configurable: true, get: () => value, set: () => undefined })
  element.setAttribute(name, value)
}

export function setImmutableElementAttributes<T extends Element>(element: T, attributes: ElementAttributes): void {
  for (let key in attributes) {
    setImmutableElementAttribute(element, key, attributes[key])
  }
}

export function removeImmutableElementAttribute<T extends Element>(element: T, name: string): void {
  if (name in element) {
    // @ts-ignore
    delete element[name]
  }

  element.removeAttribute(name)
}

export function scrollElementIntoView<T extends Element, U extends HTMLElement>(parent: T, element: U, options?: ScrollIntoViewOptions): void {
  let block: ScrollLogicalPosition, inline: ScrollLogicalPosition, pstyle: DOMRect, estyle: DOMRect, left: number | undefined, top: number | undefined

  block = options?.block || 'center'
  inline = options?.block || 'center'

  pstyle = parent.getBoundingClientRect()
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
