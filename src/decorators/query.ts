import { ReactiveElement } from 'lit'

export function Query(selector: string) {
  return function (target: any, key: PropertyKey) {
    Object.defineProperty(target, key, {
      get(this: ReactiveElement): Element | undefined {
        return this.querySelector(selector) || undefined
      }
    })
  }
}
