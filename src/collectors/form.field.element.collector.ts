import { FormFieldElementTarget } from '../definitions/types'
import type { FormFieldElement } from '../elements/form.field.element'

export class FormFieldElementCollector {
  private static map_by_id: Map<string, any> = new Map()
  private static map_by_uid: Map<string, any> = new Map()
  private static map_by_target: Map<FormFieldElementTarget, Map<string, any>> = new Map()

  static set<T extends FormFieldElement>(element: T): void {
    let map_by_path: Map<string, any> | undefined

    element.id && this.map_by_id.set(element.id, element)
    element.uid && this.map_by_uid.set(element.uid, element)

    if (!element.target || !element.path) {
      return
    }

    map_by_path = this.map_by_target.get(element.target)
    if (!map_by_path) {
      this.map_by_target.set(element.target, new Map())
      return this.set(element)
    }

    map_by_path.set(element.path, element)
  }

  static get<T extends FormFieldElement>(id: string): T | undefined
  static get<T extends FormFieldElement>(uid: string): T | undefined
  static get<T extends FormFieldElement>(target: FormFieldElementTarget, path: string): T | undefined
  static get<T extends FormFieldElement>(...args: any[]): T | undefined {
    if (typeof args[0] === 'string') {
      return this.map_by_id.get(args[0]) || this.map_by_uid.get(args[0])
    }

    return this.map_by_target.get(args[0])?.get(args[1])
  }

  static delete<T extends FormFieldElement>(element: T): void {
    this.map_by_id.delete(element.id)
    this.map_by_uid.delete(element.uid)

    if (!element.target || !element.path) {
      return
    }

    this.map_by_target.get(element.target)?.delete(element.path)
  }
}
