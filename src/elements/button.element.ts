import { css, html } from 'lit'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ButtonType, ButtonVariant } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { ClickAsyncEvent } from '../events/click.async.event'
import { ElementLogger } from '../loggers/element.logger'
import { AriaButtonElement } from './aria/aria.button.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-button': ButtonElement
  }
}

@CustomElement('q-button')
export class ButtonElement extends AriaButtonElement {
  @Property({ type: Boolean, reflect: true })
  async?: boolean

  @Property({ type: String, reflect: true })
  icon?: string

  @Property({ type: String, reflect: true })
  label?: string

  @Property({ type: Boolean, reflect: true })
  native?: boolean

  @Property({ type: Boolean, reflect: true })
  normalized?: boolean

  @Property({ type: Boolean, reflect: true })
  spinning?: boolean

  @Property({ type: String, reflect: true })
  type?: ButtonType

  @Property({ type: String, reflect: true })
  variant?: ButtonVariant

  constructor() {
    super(true)
  }

  onClick = (): void => {
    if (this.async) {
      this.onClickAsync()
    }
  }

  onClickAsync(): void {
    if (this.disabled || this.spinning) {
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

    event.preventDefault()
    event.stopPropagation()

    if (this.disabled || this.spinning) {
      return
    }

    if (this.async) {
      this.onClickAsync()
      return
    }

    this.click()
    ElementLogger.verbose(this.uid, 'onKeyDown', `The element has been clicked.`)
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

  static styles = [
    super.styles,
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
