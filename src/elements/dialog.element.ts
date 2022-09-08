import { ID } from '@queelag/core'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { QueryAssignedElements } from '../decorators/query.assigned.elements'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { ElementAttributes } from '../definitions/types'
import { CloseEvent } from '../events/close.event'
import { ElementLogger } from '../loggers/element.logger'
import { setImmutableElementAttributes } from '../utils/element.utils'
import { BaseElement } from './base.element'
import { FocusTrapElement } from './focus.trap.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-dialog': DialogElement
    'queelag-dialog-description': DialogDescriptionElement
    'queelag-dialog-label': DialogLabelElement
  }
}

@CustomElement('queelag-dialog')
export class DialogElement extends FocusTrapElement {
  @Property({ type: String, reflect: true })
  description?: string

  @QueryAssignedElements({ selector: 'queelag-dialog-description' })
  private description_elements!: DialogDescriptionElement[]

  @Property({ type: String, attribute: 'description-id' })
  description_id!: string

  @Property({ type: String, reflect: true })
  label?: string

  @QueryAssignedElements({ selector: 'queelag-dialog-label' })
  private label_elements!: DialogLabelElement[]

  @Property({ type: String, attribute: 'label-id' })
  label_id!: string

  @Property({ type: Boolean, reflect: true })
  visible?: boolean

  constructor() {
    super()

    this.description_id = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.DIALOG_DESCRIPTION })
    this.label_id = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.DIALOG_LABEL })
  }

  connectedCallback(): void {
    super.connectedCallback()
    setImmutableElementAttributes(this, this.aria_attributes)
  }

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
    this.dispatchEvent(new CloseEvent())
    ElementLogger.verbose(this.uid, 'onPostDeactive', `The close event has been dispatched.`)
  }

  onSlotChange(): void {
    setImmutableElementAttributes(this, this.aria_attributes)

    for (let element of this.description_elements) {
      setImmutableElementAttributes(element, this.description_aria_attributes)
    }

    for (let element of this.label_elements) {
      setImmutableElementAttributes(element, this.label_aria_attributes)
    }
  }

  get aria_attributes(): ElementAttributes {
    return {
      'aria-describedby': this.has_description ? this.description_id : null,
      'aria-labelledby': this.has_label ? this.label_id : null,
      'aria-modal': 'true',
      role: 'dialog'
    }
  }

  get description_aria_attributes(): ElementAttributes {
    return { id: this.has_description ? this.description_id : null }
  }

  get label_aria_attributes(): ElementAttributes {
    return { id: this.has_label ? this.label_id : undefined }
  }

  get name(): ElementName {
    return ElementName.DIALOG
  }

  get has_description(): boolean {
    return this.description_elements.length > 0
  }

  get has_label(): boolean {
    return this.label_elements.length > 0
  }
}

@CustomElement('queelag-dialog-description')
export class DialogDescriptionElement extends BaseElement {
  get name(): ElementName {
    return ElementName.DIALOG_DESCRIPTION
  }
}

@CustomElement('queelag-dialog-label')
export class DialogLabelElement extends BaseElement {
  get name(): ElementName {
    return ElementName.DIALOG_LABEL
  }
}
