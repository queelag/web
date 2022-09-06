import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from '../mixins/base.element'

@CustomElement('queelag-bottom-navigation')
export class BottomNavigationElement extends BaseElement {
  @Property({ type: String, attribute: 'active-item', reflect: true })
  active_item?: string

  activateItem(item: string): void {
    this.active_item = item
    ElementLogger.verbose(this.uid, 'activateItem', `The active item has been set.`, [this.active_item])
  }

  render() {
    return html`<slot></slot>`
  }

  get name(): ElementName {
    return ElementName.BOTTOM_NAVIGATION
  }
}

@CustomElement('queelag-bottom-navigation-item')
export class BottomNavigationItemElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  active?: boolean

  render() {
    return html`<slot></slot>`
  }

  get name(): ElementName {
    return ElementName.BOTTOM_NAVIGATION_ITEM
  }
}
