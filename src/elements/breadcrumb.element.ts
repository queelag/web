import { AriaBreadcrumbAnchorController } from '../controllers/aria-breadcrumb/aria.breadcrumb.anchor.controller'
import { AriaBreadcrumbController } from '../controllers/aria-breadcrumb/aria.breadcrumb.controller'
import { AriaBreadcrumbListController } from '../controllers/aria-breadcrumb/aria.breadcrumb.list.controller'
import { AriaBreadcrumbListItemController } from '../controllers/aria-breadcrumb/aria.breadcrumb.list.item.controller'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { BaseElement } from './base.element'
import { LinkElement } from './link.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-breadcrumb': BreadcrumbElement
    'q-breadcrumb-anchor': BreadcrumbAnchorElement
    'q-breadcrumb-list': BreadcrumbListElement
    'q-breadcrumb-list-item': BreadcrumbListItemElement
  }
}

@CustomElement('q-breadcrumb')
export class BreadcrumbElement extends BaseElement {
  protected aria: AriaBreadcrumbController = new AriaBreadcrumbController(this)

  get name(): ElementName {
    return ElementName.BREADCRUMB
  }
}

@CustomElement('q-breadcrumb-list')
export class BreadcrumbListElement extends BaseElement {
  protected aria: AriaBreadcrumbListController = new AriaBreadcrumbListController(this)

  get name(): ElementName {
    return ElementName.BREADCRUMB_LIST
  }
}

@CustomElement('q-breadcrumb-list-item')
export class BreadcrumbListItemElement extends BaseElement {
  protected aria: AriaBreadcrumbListItemController = new AriaBreadcrumbListItemController(this)

  get name(): ElementName {
    return ElementName.BREADCRUMB_LIST_ITEM
  }
}

@CustomElement('q-breadcrumb-anchor')
export class BreadcrumbAnchorElement extends LinkElement {
  protected aria2: AriaBreadcrumbAnchorController = new AriaBreadcrumbAnchorController(this)

  @Property({ type: Boolean, reflect: true })
  current?: boolean

  get name(): ElementName {
    return ElementName.BREADCRUMB_ANCHOR
  }
}
