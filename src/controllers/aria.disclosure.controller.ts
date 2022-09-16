import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import type { AriaDisclosureSectionElement } from '../elements/aria/aria.disclosure.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaDisclosureButtonController implements ReactiveController {
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
    setImmutableElementAttribute(this.host, 'role', 'button')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}

export class AriaDisclosurePanelController implements ReactiveController {
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
    if (this.host.id.length <= 0) {
      setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.DISCLOSURE_PANEL }))
    }
  }
}

export class AriaDisclosureSectionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaDisclosureSectionElement) {
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
