import { ElementAttributes, ElementAttributeValue } from '../definitions/types'

export function joinElementClasses(...classes: any[]): string {
  return classes.filter(Boolean).join(' ')
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
