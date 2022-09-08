import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { FormFieldElement } from './form.field.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-checkbox': CheckBoxElement
  }
}

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
    if (this.disabled || this.readonly) {
      return ElementLogger.warn(this.id, 'onClick', `Execution stopped, disabled is truthy.`)
    }

    this.value = !this.value
    ElementLogger.verbose(this.uid, 'onClick', `The checkbox has been ${this.value ? 'checked' : 'unchecked'}.`)

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
      return html`<input @change=${this.onChange} ?checked=${this.value} ?disabled=${this.disabled} ?readonly=${this.readonly} type="checkbox" />`
    }

    return html`
      <div
        aria-checked=${this.div_element_aria_checked}
        aria-disabled=${this.div_element_aria_disabled}
        aria-readonly=${this.div_element_aria_readonly}
        @click=${this.onClick}
        @keydown=${this.onKeyDown}
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
      * {
        cursor: pointer;
      }

      :host([normalized]) input {
        margin: 0;
      }

      div {
        display: inline-flex;
        height: 100%;
        width: 100%;
      }
    `
  ]
}
