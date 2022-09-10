import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ComboBoxListElement } from '../elements/combo.box.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

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
    switch (this.host.rootElement.autocomplete) {
      case 'both':
      case 'inline':
      case 'list':
        setImmutableElementAttribute(this.host, 'aria-label', 'Previous Searches')
        break
    }

    setImmutableElementAttribute(this.host, 'role', 'listbox')
  }
}
