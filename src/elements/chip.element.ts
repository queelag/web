import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { ChipElementVariant } from '../definitions/types'
import { BaseElement } from './core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-chip': ChipElement
  }
}

@CustomElement('q-chip')
export class ChipElement extends BaseElement {
  @Property({ type: String, reflect: true })
  icon?: string

  @Property({ type: String, reflect: true })
  image?: string

  @Property({ type: String, reflect: true })
  label?: string

  @Property({ type: String, attribute: 'leading-icon', reflect: true })
  leadingIcon?: string

  @Property({ type: String, attribute: 'trailing-icon', reflect: true })
  trailingIcon?: string

  @Property({ type: String, reflect: true })
  variant?: ChipElementVariant

  get name(): ElementName {
    return ElementName.CHIP
  }
}
