import { ELEMENT_UID_GENERATE_OPTIONS } from '@/definitions/constants'
import { ElementName } from '@/definitions/enums'
import type { AriaTooltipTriggerElement } from '@/elements/aria/aria.tooltip.element'
import { setImmutableElementAttribute } from '@/utils/element.utils'
import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'

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
    if (this.host.id.length > 0) {
      return
    }

    setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.TOOLTIP_CONTENT }))
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
    setImmutableElementAttribute(this.host, 'aria-describedby', this.host.tooltipElement.contentElement?.id)

    if (this.host.tooltipElement.focusable) {
      setImmutableElementAttribute(this.host, 'tabindex', '0')
    }
  }
}
