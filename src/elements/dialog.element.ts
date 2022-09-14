import { ID } from '@queelag/core'
import { AriaDialogController } from '../controllers/aria.dialog.controller'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'
import { FocusTrapElement } from './focus.trap.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-dialog': DialogElement
    'q-dialog-description': DialogDescriptionElement
    'q-dialog-label': DialogLabelElement
  }
}

@CustomElement('q-dialog')
export class DialogElement extends FocusTrapElement {
  protected aria: AriaDialogController = new AriaDialogController(this)

  @Property({ type: String, reflect: true })
  description?: string

  @Query('q-dialog-description')
  descriptionElement?: DialogDescriptionElement

  @Property({ type: String, attribute: 'description-id' })
  descriptionID: string = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.DIALOG_LABEL })

  @Property({ type: String, reflect: true })
  label?: string

  @Query('q-dialog-label')
  labelElement?: DialogLabelElement

  @Property({ type: String, attribute: 'label-id' })
  labelID: string = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.DIALOG_LABEL })

  @Property({ type: Boolean, reflect: true })
  visible?: boolean

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
}

@CustomElement('q-dialog-description')
export class DialogDescriptionElement extends BaseElement {
  get name(): ElementName {
    return ElementName.DIALOG_DESCRIPTION
  }
}

@CustomElement('q-dialog-label')
export class DialogLabelElement extends BaseElement {
  get name(): ElementName {
    return ElementName.DIALOG_LABEL
  }
}
