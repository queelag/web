import { html } from 'lit-html'
import { FormFieldElement } from '../classes/form.field.element'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { InputType } from '../definitions/types'

@CustomElement('queelag-input')
export class InputElement extends FormFieldElement {
  @Property({ type: Boolean, reflect: true })
  obscured?: boolean

  @Property({ type: String, reflect: true })
  type: InputType = 'text'

  on_input(event: InputEvent): void {
    // @ts-ignore
    this.value = event.target.value
  }

  render() {
    return html`<input @input=${this.on_input} type=${this.input_element_type} value=${this.value} />`
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
      case 'text':
        return this.target[this.path] || ''
      default:
        return this.target[this.path]
    }
  }

  set value(value: any) {
    super.value = value
  }
}
