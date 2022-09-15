import { ReactiveElement } from 'lit'

export function Closest(selector: string) {
  return function (target: any, key: PropertyKey) {
    Object.defineProperty(target, key, {
      get(this: ReactiveElement) {
        return this.closest(selector) || undefined
      }
    })
  }
}
