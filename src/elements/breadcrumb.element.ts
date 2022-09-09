import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import { ElementAttributes } from '../definitions/types'
import { setImmutableElementAttributes } from '../utils/element.utils'
import { BaseElement } from './base.element'
import { LinkElement } from './link.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-breadcrumb': BreadcrumbElement
    'queelag-breadcrumb-anchor': BreadcrumbAnchorElement
    'queelag-breadcrumb-list': BreadcrumbListElement
    'queelag-breadcrumb-list-item': BreadcrumbListItemElement
  }
}

@CustomElement('queelag-breadcrumb')
export class BreadcrumbElement extends BaseElement {
  connectedCallback(): void {
    super.connectedCallback()
    setImmutableElementAttributes(this, this.aria_attributes)
  }

  get aria_attributes(): ElementAttributes {
    return { 'aria-label': 'Breadcrumb', role: 'navigation' }
  }

  get name(): ElementName {
    return ElementName.BREADCRUMB
  }
}

@CustomElement('queelag-breadcrumb-list')
export class BreadcrumbListElement extends BaseElement {
  connectedCallback(): void {
    super.connectedCallback()
    setImmutableElementAttributes(this, this.aria_attributes)
  }

  get aria_attributes(): ElementAttributes {
    return { role: 'list' }
  }

  get name(): ElementName {
    return ElementName.BREADCRUMB_LIST
  }
}

@CustomElement('queelag-breadcrumb-list-item')
export class BreadcrumbListItemElement extends BaseElement {
  connectedCallback(): void {
    super.connectedCallback()
    setImmutableElementAttributes(this, this.aria_attributes)
  }

  get aria_attributes(): ElementAttributes {
    return { role: 'listitem' }
  }

  get name(): ElementName {
    return ElementName.BREADCRUMB_LIST_ITEM
  }
}

@CustomElement('queelag-breadcrumb-anchor')
export class BreadcrumbAnchorElement extends LinkElement {
  @Property({ type: Boolean, reflect: true })
  current?: boolean

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name !== 'current' || Object.is(_old, value)) {
      return
    }

    setImmutableElementAttributes(this, this.aria_attributes)
  }

  get aria_attributes(): ElementAttributes {
    return { ...super.aria_attributes, 'aria-current': this.current ? 'page' : undefined }
  }

  get name(): ElementName {
    return ElementName.BREADCRUMB_ANCHOR
  }
}
