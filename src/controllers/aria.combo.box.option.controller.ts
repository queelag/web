import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import type { ComboBoxOptionElement } from '../elements/combo.box.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaComboBoxOptionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ComboBoxOptionElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-selected', this.host.selected ? 'true' : undefined)
    setImmutableElementAttribute(this.host, 'role', 'option')

    if (this.host.id.length <= 0) {
      setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.COMBOBOX_OPTION }))
    }

    if (this.host.rootElement.inputElement) {
      if (!this.host.rootElement.inputElement?.inputElement) {
        return
      }

      if (this.host.focused) {
        setImmutableElementAttribute(this.host.rootElement.inputElement.inputElement, 'aria-activedescendant', this.host.id)
      }

      return
    }

    if (this.host.rootElement.buttonElement) {
      if (this.host.focused) {
        setImmutableElementAttribute(this.host.rootElement.buttonElement, 'aria-activedescendant', this.host.id)
      }
    }
  }
}
