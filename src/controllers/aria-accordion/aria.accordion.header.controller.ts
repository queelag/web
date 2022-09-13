import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { AccordionHeaderElement } from '../../elements/accordion.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaAccordionHeaderController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AccordionHeaderElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-level', String(this.host.level || 6))
    setImmutableElementAttribute(this.host, 'role', 'heading')
  }
}
