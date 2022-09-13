import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { BreadcrumbAnchorElement } from '../../elements/breadcrumb.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaBreadcrumbAnchorController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & BreadcrumbAnchorElement) {
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
