import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { BaseElement } from './core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-list': ListElement
    'q-list-item': ListItemElement
  }
}

@CustomElement('q-list')
export class ListElement extends BaseElement {
  @Property({ type: Array })
  items?: any[]

  get name(): ElementName {
    return ElementName.LIST
  }

  get isItemsEmpty(): boolean {
    return !this.items?.length
  }

  get isItemsNotEmpty(): boolean {
    return !this.isItemsEmpty
  }
}

@CustomElement('q-list-item')
export class ListItemElement extends BaseElement {
  @Property({ type: String, reflect: true })
  headline?: string

  @Property({ type: String, reflect: true })
  image?: string

  @Property({ type: String, reflect: true })
  icon?: string

  @Property({ type: String, reflect: true })
  text?: string

  get name(): ElementName {
    return ElementName.LIST_ITEM
  }
}
