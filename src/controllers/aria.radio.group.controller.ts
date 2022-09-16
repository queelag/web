import { ELEMENT_UID_GENERATE_OPTIONS } from '@/definitions/constants'
import { ElementName } from '@/definitions/enums'
import type { AriaRadioButtonElement, AriaRadioGroupElement } from '@/elements/aria/aria.radio.group.element'
import { setImmutableElementAttribute } from '@/utils/element.utils'
import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'

export class AriaRadioGroupController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaRadioGroupElement) {
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

export class AriaRadioButtonController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaRadioButtonElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-checked', this.host.checked ? 'true' : undefined)
    setImmutableElementAttribute(this.host, 'role', 'radio')

    if (this.host.id.length <= 0) {
      setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.RADIO_BUTTON }))
    }
  }
}
