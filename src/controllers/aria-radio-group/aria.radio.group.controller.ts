import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { RadioGroupElement } from '../../elements/radio.group.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaRadioGroupController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & RadioGroupElement) {
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
    setImmutableElementAttribute(this.host, 'aria-activedescendant', this.host.focusedButtonElement?.id)
    setImmutableElementAttribute(this.host, 'role', 'radiogroup')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}
