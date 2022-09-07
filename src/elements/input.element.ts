import { removeArrayItems, TextCodec } from '@queelag/core'
import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { DirectiveResult } from 'lit-html/directive'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { State } from '../decorators/state'
import { ElementName } from '../definitions/enums'
import { InputElementTouchTrigger, InputElementType, InputElementValue } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { styleMap } from '../directives/style.map'
import { ElementLogger } from '../loggers/element.logger'
import { FormFieldElement } from '../mixins/form.field.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-input': InputElement
  }
}

@CustomElement('queelag-input')
export class InputElement extends FormFieldElement {
  @Property({ type: Boolean, reflect: true })
  multiple?: boolean

  @Property({ type: Boolean, reflect: true })
  normalized?: boolean

  @Property({ type: Boolean, reflect: true })
  obscured?: boolean

  @Property({ type: String, reflect: true })
  padding?: string

  @Property({ type: String, reflect: true })
  placeholder?: string

  @State()
  private temporary_value: string = ''

  @Property({ type: String, attribute: 'touch-trigger', reflect: true })
  touch_trigger?: InputElementTouchTrigger

  @Property({ type: String, reflect: true })
  type: InputElementType = 'text'

  @Query('input')
  private input_element!: HTMLInputElement

  private onBlur(): void {
    this.focused = false
    ElementLogger.verbose(this.uid, 'onBlur', `The focused property has been set to false.`)

    if (this.touch_trigger === 'blur') {
      this.touch()
    }
  }

  private onFocus(): void {
    this.focused = true
    ElementLogger.verbose(this.uid, 'onFocus', `The focused property has been set to true.`)
  }

  private onInput(): void {
    switch (this.type) {
      case 'buffer':
        this.value = TextCodec.encode(this.input_element.value)
        ElementLogger.verbose(this.uid, 'onInput', `The value has been encoded and set.`, this.value)
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
        ElementLogger.verbose(this.uid, 'onInput', `The value has been set.`, [this.value])
        break
      case 'date':
      case 'datetime-local':
        this.value = this.input_element.valueAsDate || undefined
        ElementLogger.verbose(this.uid, 'onInput', `The value has been set as a date.`, this.value)
        break
      case 'number':
        this.value = this.input_element.valueAsNumber
        ElementLogger.verbose(this.uid, 'onInput', `The value has been set as a number.`, [this.value])
        break
      case 'text':
        if (this.multiple) {
          this.temporary_value = this.input_element.value
          ElementLogger.verbose(this.uid, 'onInput', `The temporary value has been set.`, [this.temporary_value])
          break
        }

        this.value = this.input_element.value
        ElementLogger.verbose(this.uid, 'onInput', `The value has been set.`, [this.value])

        break
    }

    if (this.touch_trigger === 'change') {
      this.touch()
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || this.type !== 'text' || !this.multiple) {
      return
    }

    if (this.temporary_value.length <= 0) {
      return ElementLogger.warn(this.uid, 'onKeyUp', `The temporary value is empty.`)
    }

    this.value = this.value || []
    this.value = [...(this.value as string[]), this.temporary_value]
    ElementLogger.verbose(this.uid, 'onKeyUp', `The item has been pushed.`, [this.temporary_value], this.value)

    this.input_element.value = ''
    ElementLogger.verbose(this.uid, 'onKeyUp', `The input element value has been reset.`)

    this.touch()
  }

  onClickRemoveItem(item: string): void {
    if (this.type !== 'text' || !this.multiple) {
      return
    }

    this.value = this.value || []
    this.value = removeArrayItems(this.value as string[], [item])
    ElementLogger.verbose(this.uid, 'onClickRemoveItem', `The item has been removed.`, [item], this.value)

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

    ElementLogger.verbose(this.uid, 'clear', `The value has been reset.`, [this.value])

    this.input_element.value = ''
    ElementLogger.verbose(this.uid, 'clear', `The input element value has been reset.`)

    this.input_element.focus()
    ElementLogger.verbose(this.uid, 'clear', `The input element has been focused.`)

    this.touch()
  }

  obscure(): void {
    this.obscured = true
    ElementLogger.verbose(this.uid, 'obscure', `The obscured property has been set to true.`)

    this.input_element.focus()
    ElementLogger.verbose(this.uid, 'obscure', `The input element has been focused.`)
  }

  reveal(): void {
    this.obscured = false
    ElementLogger.verbose(this.uid, 'reveal', `The obscured property has been set to false.`)

    this.input_element.focus()
    ElementLogger.verbose(this.uid, 'reveal', `The input element has been focused.`)
  }

  render() {
    return html`
      <input
        ?autofocus=${this.autofocus}
        @blur=${this.onBlur}
        ?disabled=${this.disabled}
        @focus=${this.onFocus}
        @input=${this.onInput}
        @keyup=${this.onKeyUp}
        placeholder=${ifdef(this.placeholder)}
        style=${this.input_element_style}
        type=${this.input_element_type}
        value=${ifdef(this.input_element_value)}
      />
    `
  }

  private get input_element_style(): DirectiveResult {
    return styleMap({ ...this.style_info, padding: this.padding })
  }

  private get input_element_type(): any {
    if (this.obscured) {
      return 'password'
    }

    if (this.type === 'buffer') {
      return 'text'
    }

    return this.type
  }

  private get input_element_value(): string | undefined {
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
        return super.value
      case 'date':
      case 'datetime-local':
        return super.value?.toISOString()
      case 'number':
        return super.value?.toString()
      case 'text':
        if (this.multiple) {
          return this.temporary_value
        }

        return super.value
    }
  }

  get name(): ElementName {
    return ElementName.INPUT
  }

  get value(): InputElementValue {
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

  set value(value: InputElementValue) {
    super.value = value
  }

  static styles = [
    super.styles as CSSResult,
    css`
      :host([normalized]) input {
        background: none;
        border: none;
        outline: none;
        padding: 0;
      }
    `
  ]
}
