import type { LitElement } from 'lit'
import type { BaseElementInterface } from '../mixins/base.element'

type BaseElement = LitElement & BaseElementInterface

export class ElementCollector {
  private static map_by_id: Map<string, any> = new Map()
  private static map_by_uid: Map<string, any> = new Map()

  static set<T extends BaseElement>(element: T): void {
    element.id && this.map_by_id.set(element.id, element)
    element.uid && this.map_by_uid.set(element.uid, element)
  }

  static get<T extends BaseElement>(id: string): T | undefined
  static get<T extends BaseElement>(uid: string): T | undefined
  static get<T extends BaseElement>(...args: any[]): T | undefined {
    return this.map_by_id.get(args[0]) || this.map_by_uid.get(args[0])
  }

  static delete<T extends BaseElement>(element: T): void {
    this.map_by_id.delete(element.id)
    this.map_by_uid.delete(element.uid)
  }
}
