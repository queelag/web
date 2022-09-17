import { css, CSSResultGroup, html, PropertyDeclarations } from 'lit'
import { ElementName } from '../../definitions/enums'
import { BaseElement } from '../core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-alert': AriaAlertElement
  }
}

export class AriaAlertElement extends BaseElement {
  closable?: boolean
  headline?: string
  icon?: string
  text?: string

  render() {
    return html`
      <div role="alert">
        <slot></slot>
      </div>
    `
  }

  get name(): ElementName {
    return ElementName.ALERT
  }

  static properties: PropertyDeclarations = {
    closable: { type: Boolean, reflect: true },
    headline: { type: String, reflect: true },
    icon: { type: String, reflect: true },
    text: { type: String, reflect: true }
  }

  static styles: CSSResultGroup = [
    super.styles,
    css`
      div {
        display: inline-flex;
        height: 100%;
        width: 100%;
      }
    `
  ]
}

customElements.define('q-aria-alert', AriaAlertElement)