import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-list': ListElement
    'queelag-list-item': ListItemElement
  }
}

@CustomElement('queelag-list')
export class ListElement extends BaseElement {
  @Property({ type: Object })
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

@CustomElement('queelag-list-item')
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
