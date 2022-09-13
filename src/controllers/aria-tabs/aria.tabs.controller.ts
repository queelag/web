import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { TabsElement } from '../../elements/tabs.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaTabsController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & TabsElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    // setImmutableElementAttribute(this.host, 'aria-labelledby', '')
    setImmutableElementAttribute(this.host, 'role', 'tablist')
  }
}
