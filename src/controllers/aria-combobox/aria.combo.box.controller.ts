import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ComboBoxElement } from '../../elements/combo.box.element'
import { removeImmutableElementAttribute, setImmutableElementAttribute } from '../../utils/element.utils'

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
    if (this.host.inputElement) {
      if (this.host.inputElement.inputElement) {
        setImmutableElementAttribute(this.host.inputElement.inputElement, 'aria-autocomplete', this.host.autocomplete)
        setImmutableElementAttribute(this.host.inputElement.inputElement, 'aria-controls', this.host.listElement?.id)
        setImmutableElementAttribute(this.host.inputElement.inputElement, 'aria-expanded', this.host.expanded ? 'true' : 'false')

        if (this.host.collapsed) {
          removeImmutableElementAttribute(this.host.inputElement.inputElement, 'aria-activedescendant')
        }
      }

      if (this.host.buttonElement) {
        setImmutableElementAttribute(this.host.buttonElement, 'aria-controls', this.host.listElement?.id)
        setImmutableElementAttribute(this.host.buttonElement, 'aria-expanded', this.host.expanded ? 'true' : 'false')
      }

      return
    }

    if (this.host.buttonElement) {
      // setImmutableElementAttribute(this.host, 'aria-labelledby', '')
      setImmutableElementAttribute(this.host.buttonElement, 'aria-controls', this.host.listElement?.id)
      setImmutableElementAttribute(this.host.buttonElement, 'aria-expanded', this.host.expanded ? 'true' : 'false')

      if (this.host.collapsed) {
        removeImmutableElementAttribute(this.host.buttonElement, 'aria-activedescendant')
      }
    }
  }
}
