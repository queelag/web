import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { BaseElement } from '../mixins/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-alert': AlertElement
  }
}

@CustomElement('queelag-alert')
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
    return html`<slot></slot>`
  }

  get name(): ElementName {
    return ElementName.ALERT
  }
}
