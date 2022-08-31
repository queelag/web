import { noop, tcp } from '@queelag/core'
import { css, CSSResult, html } from 'lit'
import { BaseElement } from '../classes/base.element'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { ButtonType, ButtonVariant } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { ElementLogger } from '../loggers/element.logger'

@CustomElement('queelag-button')
export class ButtonElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  disabled?: boolean

  @Property({ type: Boolean, reflect: true })
  normalized?: boolean

  @Property({ type: Boolean, reflect: true })
  spinning?: boolean

  @Property({ type: String, reflect: true })
  type?: ButtonType

  @Property({ type: String, reflect: true })
  variant?: ButtonVariant

  @Property({ type: Object })
  _onClick: Function = noop

  async on_click(event: PointerEvent) {
    if (this.disabled) {
      ElementLogger.warn(this.uid, 'onClick', `Execution stopped, this button is disabled.`)
      return
    }

    this.disabled = true
    this.spinning = true
    ElementLogger.verbose(this.uid, 'onClick', `The disabled and spinning properties have been set to true.`)

    await tcp(() => this._onClick(event))
    ElementLogger.verbose(this.uid, 'onClick', `The ${this._onClick} function has been executed.`)

    this.spinning = false
    this.disabled = false
    ElementLogger.verbose(this.uid, 'onClick', `The disabled and spinning properties have been set to false.`)
  }

  render() {
    return html`
      <button @click=${this.on_click} ?disabled=${this.disabled || this.spinning} style=${this.style_map} type=${ifdef(this.type)}>
        <slot></slot>
      </button>
      ${this.shape_html}
    `
  }

  get name(): ElementName {
    return ElementName.BUTTON
  }

  static styles = [
    BaseElement.styles as CSSResult,
    css`
      :host([normalized]) button {
        appearance: none;
        background: none;
        border: none;
        padding: 0;
      }
    `
  ]
}
