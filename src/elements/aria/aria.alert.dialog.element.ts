import { ID } from '@queelag/core'
import { AriaDialogController } from '../../controllers/aria.dialog.controller'
import { CustomElement } from '../../decorators/custom.element'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../../definitions/constants'
import { ElementName } from '../../definitions/enums'
import { AriaDialogDescriptionElement, AriaDialogElement, AriaDialogLabelElement } from './aria.dialog.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-alert-dialog': AriaAlertDialogElement
    'q-aria-alert-dialog-description': AriaAlertDialogDescriptionElement
    'q-aria-alert-dialog-label': AriaAlertDialogLabelElement
  }
}

@CustomElement('q-aria-alert-dialog')
export class AriaAlertDialogElement extends AriaDialogElement {
  constructor() {
    super()

    this.aria = new AriaDialogController(this, true)
    this.descriptionID = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.ALERT_DIALOG_DESCRIPTION })
    this.labelID = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.ALERT_DIALOG_LABEL })
  }

  get name(): ElementName {
    return ElementName.ALERT_DIALOG
  }
}

@CustomElement('q-aria-alert-dialog-description')
export class AriaAlertDialogDescriptionElement extends AriaDialogDescriptionElement {
  get name(): ElementName {
    return ElementName.ALERT_DIALOG_DESCRIPTION
  }
}

@CustomElement('q-aria-alert-dialog-label')
export class AriaAlertDialogLabelElement extends AriaDialogLabelElement {
  get name(): ElementName {
    return ElementName.ALERT_DIALOG_LABEL
  }
}
