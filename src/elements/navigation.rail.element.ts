import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { NavigationRailItemElementAttributes } from '../definitions/attributes'
import { ElementName } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-navigation-rail': NavigationRailElement
    'q-navigation-rail-item': NavigationRailItemElement
  }
}

@CustomElement('q-navigation-rail')
export class NavigationRailElement extends BaseElement {
  @Property({ type: String, attribute: 'active-item', reflect: true })
  activeItem?: string

  @Property({ type: Array })
  items?: NavigationRailItemElementAttributes[]

  activateItem(item: string): void {
    this.activeItem = item
    ElementLogger.verbose(this.uid, 'activateItem', `The active item has been set.`, [this.activeItem])
  }

  isItemActive(item: string): boolean {
    return item === this.activeItem
  }

  get name(): ElementName {
    return ElementName.NAVIGATION_RAIL
  }
}

@CustomElement('q-navigation-rail-item')
export class NavigationRailItemElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  active?: boolean

  get name(): ElementName {
    return ElementName.NAVIGATION_RAIL_ITEM
  }
}
