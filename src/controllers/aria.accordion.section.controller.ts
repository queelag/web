import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { AccordionSectionElement } from '../elements/accordion.element'
import { ElementLogger } from '../loggers/element.logger'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaAccordionSectionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AccordionSectionElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.host.headerButtonElement.addEventListener('click', this.onClickHeaderButton)
    this.setAttributes()
  }

  hostDisconnected(): void {
    this.host.headerButtonElement.removeEventListener('click', this.onClickHeaderButton)
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  onClickHeaderButton = (): void => {
    if (!this.host.collapsable && this.host.expanded) {
      ElementLogger.verbose(this.host.uid, 'onClickHeaderButton', `The section can't be collapsed.`)
      return
    }

    this.host.expanded = !this.host.expanded
    ElementLogger.verbose(this.host.uid, 'onClickHeaderButton', `The section has been ${this.host.expanded ? 'expanded' : 'collapsed'}.`)
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host.headerButtonElement, 'aria-controls', this.host.panelID)
    setImmutableElementAttribute(this.host.headerButtonElement, 'aria-disabled', !this.host.collapsable && this.host.expanded ? 'true' : 'false')
    setImmutableElementAttribute(this.host.headerButtonElement, 'id', this.host.headerButtonID)
    setImmutableElementAttribute(this.host.headerButtonElement, 'role', 'button')
    setImmutableElementAttribute(this.host.headerButtonElement, 'tabindex', '0')

    setImmutableElementAttribute(this.host.panelElement, 'aria-expanded', String(this.host.expanded))
    setImmutableElementAttribute(this.host.panelElement, 'aria-labelledby', this.host.headerButtonID)
    setImmutableElementAttribute(this.host.panelElement, 'id', this.host.panelID)
    setImmutableElementAttribute(this.host.panelElement, 'role', 'region')
  }
}
