import { css, CSSResult, html } from 'lit'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { ButtonType, ButtonVariant } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { ClickAsyncEvent } from '../events/click.async.event'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from '../mixins/base.element'

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

  private on_click() {
    if (this.disabled) {
      ElementLogger.warn(this.uid, 'on_click', `Execution stopped, this button is disabled.`)
      return
    }

    this.disabled = true
    this.spinning = true
    ElementLogger.verbose(this.uid, 'on_click', `The disabled and spinning properties have been set to true.`)

    this.dispatchEvent(new ClickAsyncEvent(this.finalize))
    ElementLogger.verbose(this.uid, 'on_click', `The "clickasync" event has been dispatched.`)
  }

  finalize = (): void => {
    this.spinning = false
    this.disabled = false
    ElementLogger.verbose(this.uid, 'finalize', `The disabled and spinning properties have been set to false.`)
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
    super.styles as CSSResult,
    css`
      :host([normalized]) button {
        appearance: none;
        background: none;
        display: inline-flex;
        border: none;
        padding: 0;
      }

      * {
        cursor: pointer;
      }
    `
  ]
}
