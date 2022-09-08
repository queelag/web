import { css, CSSResult, html } from 'lit'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ButtonType, ButtonVariant, ElementAttributes } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { ClickAsyncEvent } from '../events/click.async.event'
import { ElementLogger } from '../loggers/element.logger'
import { setImmutableElementAttributes } from '../utils/element.utils'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-button': ButtonElement
  }
}

@CustomElement('queelag-button')
export class ButtonElement extends BaseElement {
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

  @Property({ type: Boolean, reflect: true })
  spinning?: boolean

  @Property({ type: Number, attribute: 'tab-index', reflect: true })
  tab_index?: number

  @Property({ type: String, reflect: true })
  type?: ButtonType

  @Property({ type: String, reflect: true })
  variant?: ButtonVariant

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.onClick)
    this.addEventListener('keydown', this.onKeyDown)

    setImmutableElementAttributes(this, this.aria_attributes)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.onClick)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (Object.is(_old, value)) {
      return
    }

    setImmutableElementAttributes(this, this.aria_attributes)
  }

  private onClick = (): void => {
    if (this.async) {
      this.onClickAsync()
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== KeyboardEventKey.ENTER) {
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

  private onClickAsync(): void {
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

  finalize = (): void => {
    this.spinning = false
    this.disabled = false
    ElementLogger.verbose(this.uid, 'finalize', `The disabled and spinning properties have been set to false.`)
  }

  render() {
    if (this.native) {
      return html`
        <button aria-label=${ifdef(this.label)} ?disabled=${this.disabled} style=${this.style_map} tabindex="-1" type=${ifdef(this.type)}>
          <slot>${this.label}</slot>
        </button>
        ${this.shape_html}
      `
    }

    return html`
      <div aria-label=${ifdef(this.label)} aria-disabled=${this.disabled ? 'true' : 'false'} role="button">
        <slot>${this.label}</slot>
      </div>
    `
  }

  get aria_attributes(): ElementAttributes {
    return { tabindex: this.tab_index?.toString() || '0' }
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
        padding: 0;
      }

      div {
        display: inline-flex;
      }
    `
  ]
}
