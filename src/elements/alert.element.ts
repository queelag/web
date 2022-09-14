import { css, html } from 'lit'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-alert': AlertElement
  }
}

@CustomElement('q-alert')
export class AlertElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  closable?: boolean

  @Property({ type: String, reflect: true })
  headline?: string

  @Property({ type: String, reflect: true })
  icon?: string

  @Property({ type: String, reflect: true })
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

  static styles = [
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
