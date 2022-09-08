import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { NavigationBarItemElementAttributes } from '../definitions/attributes'
import { ElementName } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-navigation-bar': NavigationBarElement
    'queelag-navigation-bar-item': NavigationBarItemElement
  }
}

@CustomElement('queelag-navigation-bar')
export class NavigationBarElement extends BaseElement {
  @Property({ type: String, attribute: 'active-item', reflect: true })
  active_item?: string

  @Property({ type: Object })
  items?: NavigationBarItemElementAttributes[]

  activateItem(item: string): void {
    this.active_item = item
    ElementLogger.verbose(this.uid, 'activateItem', `The active item has been set.`, [this.active_item])
  }

  isItemActive(item: string): boolean {
    return item === this.active_item
  }

  get name(): ElementName {
    return ElementName.NAVIGATION_BAR
  }
}

@CustomElement('queelag-navigation-bar-item')
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
