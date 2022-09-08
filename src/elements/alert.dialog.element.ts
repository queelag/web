import { ID } from '@queelag/core'
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

    this.description_id = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.ALERT_DIALOG_DESCRIPTION })
    this.label_id = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.ALERT_DIALOG_LABEL })
  }

  get aria_attributes(): Record<string, any> {
    return {
      ...super.aria_attributes,
      role: 'alertdialog'
    }
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
