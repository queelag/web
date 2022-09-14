import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { NavigationBarItemElementAttributes } from '../definitions/attributes'
import { ElementName } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-navigation-bar': NavigationBarElement
    'q-navigation-bar-item': NavigationBarItemElement
  }
}

@CustomElement('q-navigation-bar')
export class NavigationBarElement extends BaseElement {
  @Property({ type: String, attribute: 'active-item', reflect: true })
  activeItem?: string

  @Property({ type: Array })
  items?: NavigationBarItemElementAttributes[]

  activateItem(item: string): void {
    this.activeItem = item
    ElementLogger.verbose(this.uid, 'activateItem', `The active item has been set.`, [this.activeItem])
  }

  isItemActive(item: string): boolean {
    return item === this.activeItem
  }

  get name(): ElementName {
    return ElementName.NAVIGATION_BAR
  }
}

@CustomElement('q-navigation-bar-item')
export class NavigationBarItemElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  active?: boolean

  @Property({ type: String, reflect: true })
  label?: string

  @Property({ type: String, reflect: true })
  icon?: string

  get name(): ElementName {
    return ElementName.NAVIGATION_BAR_ITEM
  }
}
