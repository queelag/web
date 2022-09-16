import { ELEMENT_UID_GENERATE_OPTIONS } from '@/definitions/constants'
import { ElementName } from '@/definitions/enums'
import type {
  AriaComboBoxButtonElement,
  AriaComboBoxElement,
  AriaComboBoxInputElement,
  AriaComboBoxListElement,
  AriaComboBoxOptionElement
} from '@/elements/aria/aria.combo.box.element'
import { removeImmutableElementAttribute, setImmutableElementAttribute } from '@/utils/element.utils'
import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'

export class AriaComboBoxController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaComboBoxElement) {
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

export class AriaComboBoxButtonController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaComboBoxButtonElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    if (this.host.rootElement.inputElement) {
      setImmutableElementAttribute(this.host, 'aria-label', 'Previous Searches')
      setImmutableElementAttribute(this.host, 'role', 'button')
      setImmutableElementAttribute(this.host, 'tabindex', '-1')

      return
    }

    setImmutableElementAttribute(this.host, 'role', 'combobox')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}

export class AriaComboBoxInputController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaComboBoxInputElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    if (!this.host.inputElement) {
      return
    }

    setImmutableElementAttribute(this.host.inputElement, 'role', 'combobox')

    if (this.host.inputElement.id.length <= 0) {
      setImmutableElementAttribute(this.host.inputElement, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: 'input' }))
    }
  }
}

export class AriaComboBoxListController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaComboBoxListElement) {
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

export class AriaComboBoxOptionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaComboBoxOptionElement) {
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

    if (this.host.id.length <= 0) {
      setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.COMBOBOX_OPTION }))
    }

    if (this.host.rootElement.inputElement) {
      if (!this.host.rootElement.inputElement?.inputElement) {
        return
      }

      if (this.host.focused) {
        setImmutableElementAttribute(this.host.rootElement.inputElement.inputElement, 'aria-activedescendant', this.host.id)
      }

      return
    }

    if (this.host.rootElement.buttonElement) {
      if (this.host.focused) {
        setImmutableElementAttribute(this.host.rootElement.buttonElement, 'aria-activedescendant', this.host.id)
      }
    }
  }
}
