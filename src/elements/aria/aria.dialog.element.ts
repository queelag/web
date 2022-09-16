import { ID } from '@queelag/core'
import { AriaDialogController } from '../../controllers/aria.dialog.controller'
import { CustomElement } from '../../decorators/custom.element'
import { Property } from '../../decorators/property'
import { Query } from '../../decorators/query'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../../definitions/constants'
import { ElementName } from '../../definitions/enums'
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

@CustomElement('q-aria-dialog')
export class AriaDialogElement extends FocusTrapElement {
  protected aria: AriaDialogController = new AriaDialogController(this)

  @Property({ type: String, reflect: true })
  description?: string

  @Query('q-aria-dialog-description')
  descriptionElement?: AriaDialogDescriptionElement

  @Property({ type: String, attribute: 'description-id' })
  descriptionID: string = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.DIALOG_LABEL })

  @Property({ type: String, reflect: true })
  label?: string

  @Query('q-aria-dialog-label')
  labelElement?: AriaDialogLabelElement

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

@CustomElement('q-aria-dialog-description')
export class AriaDialogDescriptionElement extends BaseElement {
  get name(): ElementName {
    return ElementName.DIALOG_DESCRIPTION
  }
}

@CustomElement('q-aria-dialog-label')
export class AriaDialogLabelElement extends BaseElement {
  get name(): ElementName {
    return ElementName.DIALOG_LABEL
  }
}
