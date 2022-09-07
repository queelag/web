import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { ChipElementVariant } from '../definitions/types'
import { BaseElement } from '../mixins/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-chip': ChipElement
  }
}

@CustomElement('queelag-chip')
export class ChipElement extends BaseElement {
  @Property({ type: String, reflect: true })
  icon?: string

  @Property({ type: String, reflect: true })
  image?: string

  @Property({ type: String, reflect: true })
  label?: string

  @Property({ type: String, attribute: 'leading-icon', reflect: true })
  leading_icon?: string

  @Property({ type: String, attribute: 'trailing-icon', reflect: true })
  trailing_icon?: string

  @Property({ type: String, reflect: true })
  variant?: ChipElementVariant

  render() {
    return html`<slot></slot>`
  }

  get name(): ElementName {
    return ElementName.CHIP
  }
}
