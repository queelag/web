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
  native?: boolean

  @Property({ type: Boolean, reflect: true })
  normalized?: boolean

  private onChange(): void {
    this.value = !this.value
    this.touch()
  }

  private onClick(): void {
    if (this.disabled) {
      return ElementLogger.warn(this.id, 'onClick', `Execution stopped, disabled is truthy.`)
    }

    this.value = !this.value
    this.touch()
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key !== KeyboardEventKey.SPACE) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.onClick()
  }

  render() {
    if (this.native) {
      return html`<input @change=${this.onChange} ?checked=${this.value} ?disabled=${this.disabled} type="checkbox" />`
    }

    return html`
      <div aria-checked=${this.div_element_aria_checked} @click=${this.onClick} @keydown=${this.onKeyDown} role="checkbox" style=${this.style_map} tabindex="0">
        <slot></slot>
      </div>
      ${this.shape_html}
    `
  }

  private get div_element_aria_checked(): 'false' | 'true' {
    return this.value ? 'true' : 'false'
  }

  get checked(): boolean {
    return this.value === true
  }

  get name(): ElementName {
    return ElementName.CHECKBOX
  }

  get value(): boolean | undefined {
    return super.value
  }

  set value(value: boolean | undefined) {
    super.value = value
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
