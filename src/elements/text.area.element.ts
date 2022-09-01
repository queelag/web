import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { ElementName } from '../definitions/enums'
import { ifdef } from '../directives/if.defined'
import { InputElement } from './input.element'

@CustomElement('queelag-textarea')
export class TextAreaElement extends InputElement {
  render() {
    return html`
      <textarea
        ?autofocus=${this.autofocus}
        @blur=${this.on_blur}
        @focus=${this.on_focus}
        @input=${this.on_input}
        @keyup=${this.on_key_up}
        placeholder=${ifdef(this.placeholder)}
        type=${this.input_element_type}
        value=${this.value}
      ></textarea>
    `
  }

  get name(): ElementName {
    return ElementName.TEXTAREA
  }
}
