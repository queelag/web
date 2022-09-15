import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { AriaBreadcrumbAnchorElement } from '../elements/aria/aria.breadcrumb.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaBreadcrumbController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-label', 'AriaBreadcrumb')
    setImmutableElementAttribute(this.host, 'role', 'navigation')
  }
}

export class AriaBreadcrumbAnchorController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaBreadcrumbAnchorElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-current', this.host.current ? 'page' : undefined)
  }
}

export class AriaBreadcrumbListController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'role', 'list')
  }
}

export class AriaBreadcrumbListItemController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'role', 'listitem')
  }
}
