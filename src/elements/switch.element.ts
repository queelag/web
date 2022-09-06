import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementLogger } from '../loggers/element.logger'
import { FormFieldElement } from '../mixins/form.field.element'

@CustomElement('queelag-switch')
export class SwitchElement extends FormFieldElement {
  @Property({ type: Boolean, reflect: true })
  native?: boolean

  private onChange(event: Event): void {
    // @ts-ignore
    this.value = event.target.value === '1'
    ElementLogger.verbose(this.uid, 'onChange', `The switch has been turned ${this.value ? 'on' : 'off'}.`)
  }

  onClick = (): void => {
    this.value = !this.value
    ElementLogger.verbose(this.uid, 'onClick', `The switch has been turned ${this.value ? 'on' : 'off'}.`)
  }

  render() {
    if (this.native) {
      return html`<input @change=${this.onChange} min="0" max="1" step="1" type="range" value=${this.input_element_value} />`
    }

    return html`<slot></slot>`
  }

  get on(): boolean {
    return this.value === true
  }

  get off(): boolean {
    return this.value !== true
  }

  private get input_element_value(): number {
    return this.value ? 1 : 0
  }

  static styles = [
    super.styles as CSSResult,
    css`
      * {
        cursor: pointer;
      }

      input {
        height: 100%;
        width: 100%;
      }
    `
  ]
}
