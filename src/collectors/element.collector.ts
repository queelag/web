import type { BaseElement } from '../elements/base.element'

export class ElementCollector {
  private static mapByID: Map<string, any> = new Map()
  private static mapByUID: Map<string, any> = new Map()

  static set<T extends BaseElement>(element: T): void {
    element.id && this.mapByID.set(element.id, element)
    element.uid && this.mapByUID.set(element.uid, element)
  }

  static get<T extends BaseElement>(id: string): T | undefined
  static get<T extends BaseElement>(uid: string): T | undefined
  static get<T extends BaseElement>(...args: any[]): T | undefined {
    return this.mapByID.get(args[0]) || this.mapByUID.get(args[0])
  }

  static delete<T extends BaseElement>(element: T): void {
    this.mapByID.delete(element.id)
    this.mapByUID.delete(element.uid)
  }
}
