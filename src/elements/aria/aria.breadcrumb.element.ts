import { AriaBreadcrumbController, AriaBreadcrumbListController, AriaBreadcrumbListItemController } from '../../controllers/aria.breadcrumb.controller'
import { CustomElement } from '../../decorators/custom.element'
import { Property } from '../../decorators/property'
import { Query } from '../../decorators/query'
import { ElementName } from '../../definitions/enums'
import { BaseElement } from '../core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-breadcrumb': AriaBreadcrumbElement
    'q-aria-breadcrumb-list': AriaBreadcrumbListElement
    'q-aria-breadcrumb-list-item': AriaBreadcrumbListItemElement
  }
}

@CustomElement('q-aria-breadcrumb')
export class AriaBreadcrumbElement extends BaseElement {
  protected aria: AriaBreadcrumbController = new AriaBreadcrumbController(this)

  get name(): ElementName {
    return ElementName.BREADCRUMB
  }
}

@CustomElement('q-aria-breadcrumb-list')
export class AriaBreadcrumbListElement extends BaseElement {
  protected aria: AriaBreadcrumbListController = new AriaBreadcrumbListController(this)

  get name(): ElementName {
    return ElementName.BREADCRUMB_LIST
  }
}

@CustomElement('q-aria-breadcrumb-list-item')
export class AriaBreadcrumbListItemElement extends BaseElement {
  protected aria: AriaBreadcrumbListItemController = new AriaBreadcrumbListItemController(this)

  @Query('a')
  anchorElement!: HTMLAnchorElement

  @Property({ type: Boolean, reflect: true })
  current?: boolean

  get name(): ElementName {
    return ElementName.BREADCRUMB_LIST_ITEM
  }
}
