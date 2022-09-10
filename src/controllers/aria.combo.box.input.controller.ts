import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import type { ComboBoxInputElement } from '../elements/combo.box.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaComboBoxInputController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ComboBoxInputElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host.inputElement, 'aria-activedescendant', this.host.rootElement.focusedListOptionElement?.id)
    setImmutableElementAttribute(this.host.inputElement, 'aria-autocomplete', this.host.rootElement.autocomplete)
    setImmutableElementAttribute(this.host.inputElement, 'aria-controls', this.host.rootElement.listElement?.id)
    setImmutableElementAttribute(this.host.inputElement, 'aria-expanded', String(this.host.rootElement.expanded))
    setImmutableElementAttribute(this.host.inputElement, 'role', 'combobox')

    if (this.host.inputElement.id.length <= 0) {
      setImmutableElementAttribute(this.host.inputElement, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: 'input' }))
    }
  }
}
