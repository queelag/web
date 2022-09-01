import { LitElement } from 'lit'
import { Property } from '../decorators/property'
import { State } from '../decorators/state'
import { Constructor, FormFieldElementSchema, FormFieldElementValidation } from '../definitions/types'
import { StateChangedEvent } from '../events/state.changed.event'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement, BaseElementInterface } from './base.element'

export declare class FormFieldElementInterface {
  disabled?: boolean
  focused?: boolean
  path: string
  target: Record<PropertyKey, any>
  touched?: boolean
  validation?: FormFieldElementValidation

  touch(): void
  validate(): void

  get error(): string
  get schema(): FormFieldElementSchema
  get value(): any

  set schema(schema: FormFieldElementSchema)
  set value(value: any)

  get isErrorVisible(): boolean
}

function FormFieldElementMixin<T extends Constructor<LitElement & BaseElementInterface>>(_: T) {
  class FormFieldElement extends _ {
    @Property({ type: Boolean, reflect: true })
    disabled?: boolean

    @Property({ type: Boolean, reflect: true })
    focused?: boolean

    @Property({ type: String, reflect: true })
    path?: string

    private _schema?: FormFieldElementSchema

    @Property({ type: Object })
    target?: Record<PropertyKey, any>

    @Property({ type: Boolean, reflect: true })
    touched?: boolean

    @State()
    validation?: FormFieldElementValidation

    @State()
    private _value: any

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

    @Property({ type: Object })
    get schema(): FormFieldElementSchema | undefined {
      return this._schema
    }

    set schema(schema: FormFieldElementSchema | undefined) {
      this._schema = schema
    }

    get value(): any {
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
      ElementLogger.verbose(this.uid, 'set_value', `The value has been set.`, [value])

      this.validate()
      this.dispatchEvent(new StateChangedEvent('value', old, value))
    }

    get isErrorVisible(): boolean {
      return typeof this.error === 'string' && this.touched === true
    }
  }

  return FormFieldElement as Constructor<FormFieldElementInterface> & T
}

export const FormFieldElement = FormFieldElementMixin(BaseElement)
