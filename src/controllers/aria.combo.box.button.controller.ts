import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ComboBoxButtonElement } from '../elements/combo.box.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaComboBoxButtonController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ComboBoxButtonElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    switch (this.host.rootElement.autocomplete) {
      case 'both':
      case 'inline':
      case 'list':
        setImmutableElementAttribute(this.host, 'aria-label', 'Previous Searches')
        setImmutableElementAttribute(this.host, 'role', 'button')

        break
      default:
        setImmutableElementAttribute(this.host, 'role', 'combobox')
        setImmutableElementAttribute(this.host, 'tabindex', '0')

        break
    }
  }
}
