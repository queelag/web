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
    switch (this.host.autocomplete) {
      case 'both':
      case 'inline':
      case 'list':
        if (this.host.buttonElement) {
          setImmutableElementAttribute(this.host.buttonElement, 'aria-controls', this.host.listElement?.id)
          setImmutableElementAttribute(this.host.buttonElement, 'aria-expanded', this.host.expanded ? 'true' : 'false')
        }

        if (this.host.inputElement) {
          setImmutableElementAttribute(this.host.inputElement.inputElement, 'aria-activedescendant', this.host.focusedListOptionElement?.id)
          setImmutableElementAttribute(this.host.inputElement.inputElement, 'aria-autocomplete', this.host.autocomplete)
          setImmutableElementAttribute(this.host.inputElement.inputElement, 'aria-controls', this.host.listElement?.id)
          setImmutableElementAttribute(this.host.inputElement.inputElement, 'aria-expanded', this.host.expanded ? 'true' : 'false')
        }

        break
      default:
        if (this.host.buttonElement) {
          // setImmutableElementAttribute(this.host, 'aria-labelledby', '')
          setImmutableElementAttribute(this.host.buttonElement, 'aria-activedescendant', this.host.focusedListOptionElement?.id)
          setImmutableElementAttribute(this.host.buttonElement, 'aria-controls', this.host.listElement?.id)
          setImmutableElementAttribute(this.host.buttonElement, 'aria-expanded', this.host.expanded ? 'true' : 'false')
          setImmutableElementAttribute(this.host.buttonElement, 'role', 'combobox')
          setImmutableElementAttribute(this.host.buttonElement, 'tabindex', '0')
        }

        break
    }

    for (let option of this.host.listOptionElements) {
      option.focused = this.host.isListOptionElementFocused(option)
    }
  }
}
