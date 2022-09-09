import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ButtonElement } from '../elements/button.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaButtonController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ButtonElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    if (this.host.native) {
      setImmutableElementAttribute(this.host, 'tabindex', '0')
      return
    }

    setImmutableElementAttribute(this.host, 'aria-disabled', this.host.disabled ? 'true' : undefined)
    setImmutableElementAttribute(this.host, 'aria-label', this.host.label)
    setImmutableElementAttribute(this.host, 'aria-pressed', this.host.pressed ? 'true' : undefined)
    setImmutableElementAttribute(this.host, 'role', 'button')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}
