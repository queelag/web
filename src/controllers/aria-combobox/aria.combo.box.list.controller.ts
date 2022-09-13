import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../../definitions/constants'
import { ElementName } from '../../definitions/enums'
import type { ComboBoxListElement } from '../../elements/combo.box.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaComboBoxListController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ComboBoxListElement) {
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
      setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.COMBOBOX_LIST }))
    }

    if (this.host.rootElement.inputElement) {
      setImmutableElementAttribute(this.host, 'aria-label', 'Previous Searches')
    }

    setImmutableElementAttribute(this.host, 'role', 'listbox')
  }
}
