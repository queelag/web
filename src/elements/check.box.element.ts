import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { FormFieldElement } from '../mixins/form.field.element'

@CustomElement('queelag-checkbox')
export class CheckBoxElement extends FormFieldElement {
  @Property({ type: Boolean, reflect: true })
  checked?: boolean

  @Property({ type: Boolean, reflect: true })
  native?: boolean

  @Property({ type: Boolean, reflect: true })
  normalized?: boolean

  private on_change(): void {
    this.value = !this.value
    this.checked = this.value

    this.touch()
  }

  private on_click(): void {
    if (this.disabled) {
      return ElementLogger.warn(this.id, 'on_click', `Execution stopped, disabled is truthy.`)
    }

    this.value = !this.value
    this.checked = this.value

    this.touch()
  }

  private on_key_down(event: KeyboardEvent): void {
    if (event.key !== KeyboardEventKey.SPACE) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.on_click()
  }

  render() {
    if (this.native) {
      return html`<input @change=${this.on_change} ?checked=${this.checked} ?disabled=${this.disabled} type="checkbox" />`
    }

    return html`
      <div
        aria-checked=${this.div_element_aria_checked}
        @click=${this.on_click}
        @keydown=${this.on_key_down}
        role="checkbox"
        style=${this.style_map}
        tabindex="0"
      >
        <slot></slot>
      </div>
      ${this.shape_html}
    `
  }

  private get div_element_aria_checked(): 'false' | 'true' {
    return this.checked ? 'true' : 'false'
  }

  get name(): ElementName {
    return ElementName.CHECKBOX
  }

  static styles = [
    super.styles as CSSResult,
    css`
      :host([normalized]) input {
        margin: 0;
      }

      div,
      input {
        cursor: pointer;
      }
    `
  ]
}
