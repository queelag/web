import { ReactiveController, ReactiveControllerHost } from 'lit'
import { setImmutableElementAttribute } from '../utils/element.utils'

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
