import { css } from 'lit'
import { AriaLinkController } from '../controllers/aria.link.controller'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-link': LinkElement
  }
}

@CustomElement('q-link')
export class LinkElement extends BaseElement {
  protected aria: AriaLinkController = new AriaLinkController(this)

  @Property({ type: String, reflect: true })
  href?: string

  @Property({ type: String, reflect: true })
  target?: string

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
    if (!this.href) {
      return
    }

    window.open(this.href, this.target)
  }

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== KeyboardEventKey.ENTER) {
      return
    }

    this.click()
  }

  get name(): ElementName {
    return ElementName.LINK
  }

  static styles = [
    super.styles,
    css`
      * {
        cursor: pointer;
      }
    `
  ]
}
