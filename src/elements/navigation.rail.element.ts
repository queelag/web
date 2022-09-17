import { PropertyDeclarations } from 'lit'
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

export class NavigationRailElement extends BaseElement {
  /**
   * PROPERTIES
   */
  activeItem?: string
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

  static properties: PropertyDeclarations = {
    activeItem: { type: String, attribute: 'active-item', reflect: true },
    items: { type: Array }
  }
}

export class NavigationRailItemElement extends BaseElement {
  /**
   * PROPERTIES
   */
  active?: boolean
  label?: string
  icon?: string

  get name(): ElementName {
    return ElementName.NAVIGATION_RAIL_ITEM
  }

  static properties: PropertyDeclarations = {
    active: { type: Boolean, reflect: true },
    label: { type: String, reflect: true },
    icon: { type: String, reflect: true }
  }
}

customElements.define('q-navigation-rail', NavigationRailElement)
customElements.define('q-navigation-rail-item', NavigationRailItemElement)
