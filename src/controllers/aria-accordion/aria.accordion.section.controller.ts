import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { AccordionSectionElement } from '../../elements/accordion.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaAccordionSectionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AccordionSectionElement) {
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
    setImmutableElementAttribute(this.host.buttonElement, 'aria-disabled', !this.host.collapsable && this.host.expanded ? 'true' : 'false')

    if (this.host.panelElement) {
      setImmutableElementAttribute(this.host.panelElement, 'aria-expanded', String(this.host.expanded))
      setImmutableElementAttribute(this.host.panelElement, 'aria-labelledby', this.host.buttonElement.id)
    }
  }
}
