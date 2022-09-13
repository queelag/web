import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { DisclosureSectionElement } from '../../elements/disclosure.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaDisclosureSectionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & DisclosureSectionElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host.buttonElement, 'aria-controls', this.host.panelElement?.id)
    setImmutableElementAttribute(this.host.buttonElement, 'aria-expanded', this.host.expanded ? 'true' : 'false')
  }
}
