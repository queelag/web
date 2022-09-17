import { FormFieldElementCollector } from '../../collectors/form.field.element.collector'
import { FormFieldElementSchema, FormFieldElementTarget, FormFieldElementValidation } from '../../definitions/types'
import { StateChangedEvent } from '../../events/state.changed.event'
import { ElementLogger } from '../../loggers/element.logger'
import { BaseElement } from './base.element'

export class FormFieldElement extends BaseElement {
  private _schema?: FormFieldElementSchema
  private _target?: FormFieldElementTarget

  /**
   * PROPERTIES
   */
  disabled?: boolean
  focused?: boolean
  path?: string
  readonly?: boolean
  touched?: boolean

  /**
   * STATES
   */
  validation?: FormFieldElementValidation
  private _value: any

  connectedCallback(): void {
    super.connectedCallback()
    FormFieldElementCollector.set(this)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    FormFieldElementCollector.delete(this)
  }

  touch(): void {
    if (!this.touched) {
      this.touched = true
      ElementLogger.verbose(this.uid, 'touch', `The touched state has been set to true.`)
    }

    this.validate()
  }

  validate(): void {
    if (!this.schema) {
      return
    }

    this.validation = this.schema.validate(this.value)
    ElementLogger.verbose(this.uid, 'validate', `The value has been validated against the schema.`, this.validation)
  }

  get error(): string | undefined {
    if (!this.validation) {
      return
    }

    return this.validation[0]?.message
  }

  get schema(): FormFieldElementSchema | undefined {
    return this._schema
  }

  set schema(schema: FormFieldElementSchema | undefined) {
    this._schema = schema
  }

  get target(): FormFieldElementTarget | undefined {
    return this._target
  }

  set target(target: FormFieldElementTarget | undefined) {
    let old: FormFieldElementTarget | undefined

    FormFieldElementCollector.delete(this)

    old = this._target
    this._target = target

    FormFieldElementCollector.set(this)

    this.requestUpdate('target', old)
  }

  get value(): any {
    FormFieldElementCollector.set(this)

    if (this.target && typeof this.path === 'string') {
      return this.target[this.path]
    }

    return this._value
  }

  set value(value: any) {
    let old: any = this.value

    if (this.target && typeof this.path === 'string') {
      this.target[this.path] = value
    }

    this._value = value
    // ElementLogger.verbose(this.uid, 'set value', `The value has been set.`, [value])

    this.validate()
    this.dispatchEvent(new StateChangedEvent('value', old, value))
  }

  get isErrorVisible(): boolean {
    return typeof this.error === 'string' && this.touched === true
  }

  get isValid(): boolean {
    return typeof this.error === 'undefined'
  }

  static properties = {
    disabled: { type: Boolean, reflect: true },
    focused: { type: Boolean, reflect: true },
    path: { type: String, reflect: true },
    readonly: { type: Boolean, reflect: true },
    schema: { type: Object },
    touched: { type: Boolean, reflect: true },
    validation: { state: true },
    _value: { state: true }
  }
}