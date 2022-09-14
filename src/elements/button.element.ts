import { css, CSSResult, html } from 'lit'
import { AriaButtonController } from '../controllers/aria.button.controller'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ButtonPressed, ButtonType, ButtonVariant } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { ClickAsyncEvent } from '../events/click.async.event'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-button': ButtonElement
  }
}

@CustomElement('q-button')
export class ButtonElement extends BaseElement {
  protected aria: AriaButtonController = new AriaButtonController(this)

  @Property({ type: Boolean, reflect: true })
  async?: boolean

  @Property({ type: Boolean, reflect: true })
  disabled?: boolean

  @Property({ type: String, reflect: true })
  icon?: string

  @Property({ type: String, reflect: true })
  label?: string

  @Property({ type: Boolean, reflect: true })
  native?: boolean

  @Property({ type: Boolean, reflect: true })
  normalized?: boolean

  @Property({ type: String, reflect: true })
  pressed?: ButtonPressed

  @Property({ type: Boolean, reflect: true })
  spinning?: boolean

  @Property({ type: String, reflect: true })
  type?: ButtonType

  @Property({ type: String, reflect: true })
  variant?: ButtonVariant

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.onClick)
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.onClick)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onClick = (): void => {
    if (this.async) {
      this.onClickAsync()
    }
  }

  onClickAsync(): void {
    if (this.isNotClickable) {
      ElementLogger.warn(this.uid, 'onClickAsync', `The element is disabled or spinning.`)
      return
    }

    this.disabled = true
    this.spinning = true
    ElementLogger.verbose(this.uid, 'onClickAsync', `The disabled and spinning properties have been set to true.`)

    this.dispatchEvent(new ClickAsyncEvent(this.finalize))
    ElementLogger.verbose(this.uid, 'onClickAsync', `The "clickasync" event has been dispatched.`)
  }

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== KeyboardEventKey.ENTER && event.key !== KeyboardEventKey.SPACE) {
      return
    }

    if (this.async) {
      this.onClickAsync()
      return
    }

    if (this.isClickable) {
      this.click()
      ElementLogger.verbose(this.uid, 'onKeyDown', `The element has been clicked.`)
    }
  }

  finalize = (): void => {
    this.spinning = false
    this.disabled = false

    ElementLogger.verbose(this.uid, 'finalize', `The disabled and spinning properties have been set to false.`)
  }

  render() {
    if (this.native) {
      return html`
        <button
          aria-label=${ifdef(this.label)}
          aria-pressed=${ifdef(this.pressed)}
          ?disabled=${this.disabled}
          style=${this.styleMap}
          tabindex="-1"
          type=${ifdef(this.type)}
        >
          <slot>${this.label}</slot>
        </button>
        ${this.shapeHTML}
      `
    }

    return html`
      <div style=${this.styleMap}>
        <slot>${this.label}</slot>
      </div>
      ${this.shapeHTML}
    `
  }

  get name(): ElementName {
    return ElementName.BUTTON
  }

  get isClickable(): boolean {
    return !this.disabled && !this.spinning
  }

  get isNotClickable(): boolean {
    return !this.isClickable
  }

  static styles = [
    super.styles as CSSResult,
    css`
      * {
        cursor: pointer;
      }

      :host([normalized]) button {
        appearance: none;
        background: none;
        display: inline-flex;
        border: none;
        height: 100%;
        padding: 0;
        width: 100%;
      }

      div {
        display: inline-flex;
        height: 100%;
        width: 100%;
      }
    `
  ]
}
