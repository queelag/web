import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ComboBoxElement } from '../elements/combo.box.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaComboBoxController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ComboBoxElement) {
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
    setImmutableElementAttribute(this.host, 'aria-activedescendant', this.host.focusedListOptionElement?.id)
    setImmutableElementAttribute(this.host, 'aria-autocomplete', this.host.autocomplete)
    setImmutableElementAttribute(this.host, 'aria-controls', this.host.listElement?.id)
    setImmutableElementAttribute(this.host, 'aria-expanded', String(this.host.expanded))
    setImmutableElementAttribute(this.host, 'role', 'combobox')
  }
}
