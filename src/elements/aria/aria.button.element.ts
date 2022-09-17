import { css, PropertyDeclarations } from 'lit'
import { AriaButtonController } from '../../controllers/aria.button.controller'
import { ElementName, KeyboardEventKey } from '../../definitions/enums'
import { ButtonPressed } from '../../definitions/types'
import { ElementLogger } from '../../loggers/element.logger'
import { BaseElement } from '../core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-button': AriaButtonElement
  }
}

export class AriaButtonElement extends BaseElement {
  protected aria: AriaButtonController

  disabled?: boolean
  pressed?: ButtonPressed

  constructor(native?: boolean) {
    super()
    this.aria = new AriaButtonController(this, native)
  }

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

  onClick = (): void => {}

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== KeyboardEventKey.ENTER && event.key !== KeyboardEventKey.SPACE) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.click()
    ElementLogger.verbose(this.uid, 'onKeyDown', `The element has been clicked.`)
  }

  get name(): ElementName {
    return ElementName.BUTTON
  }

  static properties: PropertyDeclarations = {
    disabled: { type: Boolean, reflect: true },
    pressed: { type: String, reflect: true }
  }

  static styles = [
    super.styles,
    css`
      :host {
        cursor: pointer;
      }
    `
  ]
}

customElements.define('q-aria-button', AriaButtonElement)
