import { PropertyDeclarations } from 'lit'
import { AriaDialogController, AriaDialogDescriptionController, AriaDialogLabelController } from '../../controllers/aria.dialog.controller'
import { ElementName } from '../../definitions/enums'
import { QueryDeclarations } from '../../definitions/interfaces'
import { ElementLogger } from '../../loggers/element.logger'
import { BaseElement } from '../core/base.element'
import { FocusTrapElement } from '../core/focus.trap.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-dialog': AriaDialogElement
    'q-aria-dialog-description': AriaDialogDescriptionElement
    'q-aria-dialog-label': AriaDialogLabelElement
  }
}

export class AriaDialogElement extends FocusTrapElement {
  protected aria: AriaDialogController = new AriaDialogController(this)

  /**
   * PROPERTIES
   */
  description?: string
  label?: string
  visible?: boolean

  /**
   * QUERIES
   */
  descriptionElement?: AriaDialogDescriptionElement
  labelElement?: AriaDialogLabelElement

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name !== 'visible' || Object.is(_old, value)) {
      return
    }

    if (value !== null) {
      this.activateFocusTrap()
      document.body.style.overflow = 'hidden'

      return
    }

    this.deactivateFocusTrap()
    document.body.style.overflow = ''
  }

  onFocusTrapPostDeactivate = (): void => {
    this.dispatchEvent(new Event('close'))
    ElementLogger.verbose(this.uid, 'onPostDeactive', `The close event has been dispatched.`)
  }

  get name(): ElementName {
    return ElementName.DIALOG
  }

  static properties: PropertyDeclarations = {
    description: { type: String, reflect: true },
    label: { type: String, reflect: true },
    visible: { type: Boolean, reflect: true }
  }

  static queries: QueryDeclarations = {
    descriptionElement: { selector: 'q-aria-dialog-description' },
    labelElement: { selector: 'q-aria-dialog-label' }
  }
}

export class AriaDialogDescriptionElement extends BaseElement {
  protected aria: AriaDialogDescriptionController = new AriaDialogDescriptionController(this)

  get name(): ElementName {
    return ElementName.DIALOG_DESCRIPTION
  }
}

export class AriaDialogLabelElement extends BaseElement {
  protected aria: AriaDialogLabelController = new AriaDialogLabelController(this)

  get name(): ElementName {
    return ElementName.DIALOG_LABEL
  }
}

customElements.define('q-aria-dialog', AriaDialogElement)
customElements.define('q-aria-dialog-description', AriaDialogDescriptionElement)
customElements.define('q-aria-dialog-label', AriaDialogLabelElement)
