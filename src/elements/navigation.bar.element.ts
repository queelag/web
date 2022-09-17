import { PropertyDeclarations } from 'lit'
import { NavigationBarItemElementAttributes } from '../definitions/attributes'
import { ElementName } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-navigation-bar': NavigationBarElement
    'q-navigation-bar-item': NavigationBarItemElement
  }
}

export class NavigationBarElement extends BaseElement {
  /**
   * PROPERTIES
   */
  activeItem?: string
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

  static properties: PropertyDeclarations = {
    activeItem: { type: String, attribute: 'active-item', reflect: true },
    items: { type: Array }
  }
}

export class NavigationBarItemElement extends BaseElement {
  /**
   * PROPERTIES
   */
  active?: boolean
  label?: string
  icon?: string

  get name(): ElementName {
    return ElementName.NAVIGATION_BAR_ITEM
  }

  static properties: PropertyDeclarations = {
    active: { type: Boolean, reflect: true },
    label: { type: String, reflect: true },
    icon: { type: String, reflect: true }
  }
}

customElements.define('q-navigation-bar', NavigationBarElement)
customElements.define('q-navigation-bar-item', NavigationBarItemElement)
