import { ReactiveElement } from 'lit'

export function QueryAll(selector: string) {
  return function (target: any, key: PropertyKey) {
    Object.defineProperty(target, key, {
      get(this: ReactiveElement) {
        return [...this.querySelectorAll(selector)]
      }
    })
  }
}
