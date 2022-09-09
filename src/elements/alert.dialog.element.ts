import { ID } from '@queelag/core'
import { AriaDialogController } from '../controllers/aria.dialog.controller'
import { CustomElement } from '../decorators/custom.element'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { DialogDescriptionElement, DialogElement, DialogLabelElement } from './dialog.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-alert-dialog': AlertDialogElement
    'queelag-alert-dialog-description': AlertDialogDescriptionElement
    'queelag-alert-dialog-label': AlertDialogLabelElement
  }
}

@CustomElement('queelag-alert-dialog')
export class AlertDialogElement extends DialogElement {
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

@CustomElement('queelag-alert-dialog-description')
export class AlertDialogDescriptionElement extends DialogDescriptionElement {
  get name(): ElementName {
    return ElementName.ALERT_DIALOG_DESCRIPTION
  }
}

@CustomElement('queelag-alert-dialog-label')
export class AlertDialogLabelElement extends DialogLabelElement {
  get name(): ElementName {
    return ElementName.ALERT_DIALOG_LABEL
  }
}
