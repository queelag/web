import { LitElement } from 'lit'
import { Struct, StructError } from 'superstruct'
import { Property } from '../decorators/property'
import { State } from '../decorators/state'
import { Constructor } from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement, BaseElementInterface } from './base.element'

export declare class FormFieldElementInterface {
  disabled?: boolean
  path: string
  schema?: Struct
  target: Record<PropertyKey, any>
  touched?: boolean
  validation?: [StructError | undefined, any]

  touch(): void
  validate(): void

  get error(): string
  get value(): any

  set value(value: any)
}

function FormFieldElementMixin<T extends Constructor<LitElement & BaseElementInterface>>(_: T) {
  class FormFieldElement extends _ {
    @Property({ type: Boolean, reflect: true })
    disabled?: boolean

    @Property({ type: String, reflect: true })
    path: string = ''

    private _schema?: Struct

    @Property({ type: Object })
    target: Record<PropertyKey, any> = {}

    @Property({ type: Boolean, reflect: true })
    touched?: boolean

    @State()
    validation?: [StructError | undefined, any]

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
      ElementLogger.verbose(this.uid, 'validate', `The value has been validated against the schema.`, this.validation, this.schema, [this.value])
    }

    get error(): string | undefined {
      if (!this.validation) {
        return
      }

      return this.validation[0]?.message
    }

    @Property({ type: Object })
    get schema(): Struct | undefined {
      return this._schema
    }

    set schema(schema: Struct | undefined) {
      this._schema = schema
    }

    get value(): any {
      return this.target[this.path]
    }

    set value(value: any) {
      this.target[this.path] = value
      ElementLogger.verbose(this.uid, 'set_value', `The value has been set.`, [value])

      this.validate()
    }
  }

  return FormFieldElement as Constructor<FormFieldElementInterface> & T
}

export const FormFieldElement = FormFieldElementMixin(BaseElement)
