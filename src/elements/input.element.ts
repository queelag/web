import { removeArrayItems, TextCodec } from '@queelag/core'
import { html } from 'lit-html'
import { FormFieldElement } from '../classes/form.field.element'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { State } from '../decorators/state'
import { ElementName } from '../definitions/enums'
import { InputTouchTrigger, InputType } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { ElementLogger } from '../loggers/element.logger'

@CustomElement('queelag-input')
export class InputElement extends FormFieldElement {
  @Property({ type: Boolean, reflect: true })
  focused?: boolean

  @Property({ type: Boolean, reflect: true })
  multiple?: boolean

  @Property({ type: Boolean, reflect: true })
  obscured?: boolean

  @Property({ type: String, reflect: true })
  placeholder?: string

  @State()
  temporary_value: string = ''

  @Property({ type: String, reflect: true })
  touchtrigger: InputTouchTrigger = 'blur'

  @Property({ type: String, reflect: true })
  type: InputType = 'text'

  @Query('input')
  private input_element!: HTMLInputElement

  protected on_blur(): void {
    this.focused = false
    ElementLogger.verbose(this.uid, 'on_blur', `The focused property has been set to false.`)

    if (this.touchtrigger === 'blur') {
      this.touch()
    }
  }

  protected on_focus(): void {
    this.focused = true
    ElementLogger.verbose(this.uid, 'on_blur', `The focused property has been set to true.`)
  }

  protected on_input(): void {
    switch (this.type) {
      case 'buffer':
        this.value = TextCodec.encode(this.input_element.value)
        ElementLogger.verbose(this.uid, 'on_input', `The value has been encoded and set.`, this.value)
        break
      case 'color':
      case 'email':
      case 'month':
      case 'password':
      case 'search':
      case 'tel':
      case 'time':
      case 'url':
      case 'week':
        this.value = this.input_element.value
        ElementLogger.verbose(this.uid, 'on_input', `The value has been set.`, [this.value])
        break
      case 'date':
      case 'datetime-local':
        this.value = this.input_element.valueAsDate
        ElementLogger.verbose(this.uid, 'on_input', `The value has been set as a date.`, this.value)
        break
      case 'number':
        this.value = this.input_element.valueAsNumber
        ElementLogger.verbose(this.uid, 'on_input', `The value has been set as a number.`, [this.value])
        break
      case 'text':
        if (this.multiple) {
          this.temporary_value = this.input_element.value
          ElementLogger.verbose(this.uid, 'on_input', `The temporary value has been set.`, [this.temporary_value])
          break
        }

        this.value = this.input_element.value
        ElementLogger.verbose(this.uid, 'on_input', `The value has been set.`, [this.value])

        break
    }

    if (this.touchtrigger === 'change') {
      this.touch()
    }

    this.validate()
  }

  protected on_key_up(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || this.type !== 'text' || !this.multiple) {
      return
    }

    if (this.temporary_value.length <= 0) {
      return ElementLogger.warn(this.uid, 'on_key_up', `The temporary value is empty.`)
    }

    this.value = [...this.value, this.temporary_value]
    this.input_element.value = ''

    this.touch()
  }

  removeItem(item: any): void {
    if (this.type !== 'text' || !this.multiple) {
      return
    }

    this.value = removeArrayItems(this.value, [item])
    this.touch()
  }

  clear(): void {
    switch (this.type) {
      case 'buffer':
        this.value = new Uint8Array()
        break
      case 'color':
      case 'email':
      case 'month':
      case 'password':
      case 'search':
      case 'tel':
      case 'time':
      case 'url':
      case 'week':
        this.value = ''
        break
      case 'date':
      case 'datetime-local':
        this.value = new Date()
        break
      case 'number':
        this.value = 0
        break
      case 'text':
        if (this.multiple) {
          this.value = []
          break
        }

        this.value = ''
        break
    }

    this.input_element.value = ''
    this.touch()
  }

  obscure(): void {
    this.obscured = true
    ElementLogger.verbose(this.uid, 'obscure', `The obscured property has been set to true.`)
  }

  reveal(): void {
    this.obscured = false
    ElementLogger.verbose(this.uid, 'obscure', `The obscured property has been set to false.`)
  }

  render() {
    return html`
      <input
        ?autofocus=${this.autofocus}
        @blur=${this.on_blur}
        @focus=${this.on_focus}
        @input=${this.on_input}
        @keyup=${this.on_key_up}
        placeholder=${ifdef(this.placeholder)}
        type=${this.input_element_type}
        value=${this.value}
      />
    `
  }

  get input_element_type(): any {
    if (this.obscured) {
      return 'password'
    }

    if (this.type === 'buffer') {
      return 'text'
    }

    return this.type
  }

  get name(): ElementName {
    return ElementName.INPUT
  }

  get value(): any {
    switch (this.type) {
      case 'buffer':
        return undefined
      case 'color':
      case 'email':
      case 'month':
      case 'password':
      case 'search':
      case 'tel':
      case 'time':
      case 'url':
      case 'week':
        return super.value || ''
      case 'date':
      case 'datetime-local':
        return super.value || new Date()
      case 'number':
        return super.value || 0
      case 'text':
        if (this.multiple) {
          return super.value || []
        }

        return super.value || ''
    }
  }

  set value(value: any) {
    super.value = value
  }
}
