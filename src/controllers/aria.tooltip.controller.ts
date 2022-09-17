import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import type { AriaTooltipContentElement, AriaTooltipTriggerElement } from '../elements/aria/aria.tooltip.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaTooltipController implements ReactiveController {
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
    setImmutableElementAttribute(this.host, 'role', 'tooltip')
  }
}

export class AriaTooltipContentController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaTooltipContentElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    if (this.host.id.length > 0) {
      return
    }

    setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: this.host.name }))
  }
}

export class AriaTooltipTriggerController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaTooltipTriggerElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-describedby', this.host.rootElement.contentElement?.id)

    if (this.host.rootElement.focusable) {
      setImmutableElementAttribute(this.host, 'tabindex', '0')
    }
  }
}
