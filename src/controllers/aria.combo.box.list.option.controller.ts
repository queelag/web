import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ComboBoxListOptionElement } from '../elements/combo.box.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaComboBoxListOptionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ComboBoxListOptionElement) {
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
  }
}
