import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import type { ListBoxElement } from '../elements/list.box.element'
import { setElementAttribute, setImmutableElementAttribute } from '../utils/element.utils'

export class AriaListBoxController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ListBoxElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-activedescendant', this.host.focusedOptionElement?.id)
    setImmutableElementAttribute(this.host, 'aria-multiselectable', this.host.multiple ? 'true' : undefined)
    setImmutableElementAttribute(this.host, 'role', 'listbox')
    setImmutableElementAttribute(this.host, 'tabindex', '0')

    for (let option of this.host.optionElements) {
      setElementAttribute(option, 'focused', this.host.isOptionElementFocused(option) ? '' : undefined)

      if (option.id.length <= 0) {
        setImmutableElementAttribute(option, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.LISTBOX_OPTION }))
      }
    }
  }
}
