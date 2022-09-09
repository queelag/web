import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ListBoxOptionElement } from '../elements/list.box.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaListBoxOptionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & ListBoxOptionElement) {
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
