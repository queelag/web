import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { TooltipTriggerElement } from '../../elements/tooltip.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaTooltipTriggerController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & TooltipTriggerElement) {
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
