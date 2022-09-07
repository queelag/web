import { ID } from '@queelag/core'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { BaseElement } from '../mixins/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-alert-dialog': AlertDialogElement
    'queelag-alert-dialog-description': AlertDialogDescriptionElement
    'queelag-alert-dialog-label': AlertDialogLabelElement
  }
}

@CustomElement('queelag-alert-dialog')
export class AlertDialogElement extends BaseElement {
  @Property({ type: String, reflect: true })
  description?: string

  @Property({ type: String, attribute: 'description-id' })
  description_id!: string

  @Property({ type: String, reflect: true })
  label?: string

  @Property({ type: String, attribute: 'label-id' })
  label_id!: string

  constructor() {
    super()

    this.description_id = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.ALERT_DIALOG_DESCRIPTION })
    this.label_id = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.ALERT_DIALOG_LABEL })
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key !== KeyboardEventKey.ESCAPE) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.dispatchEvent(new Event('close'))
  }

  render() {
    return html`<slot></slot>`

    // return html`
    //   <div aria-describedby=${this.description_id} aria-labelledby=${this.label_id} aria-modal="true" @keydown=${this.onKeyDown} role="alertdialog">
    //     ${when(
    //       Boolean(this.label),
    //       () => html`<queelag-alert-dialog-label id=${this.label_id}><slot name="label">${this.label}</slot></queelag-alert-dialog-label>`
    //     )}
    //     ${when(
    //       Boolean(this.description),
    //       () =>
    //         html`<queelag-alert-dialog-description id=${this.description_id}
    //           ><slot name="description">${this.description}</slot></queelag-alert-dialog-description
    //         >`
    //     )}
    //     <slot></slot>
    //   </div>
    // `
  }

  get aria_attributes(): Record<string, any> {
    return {
      'aria-describedby': this.description_id,
      'aria-labelledby': this.label_id,
      'aria-modal': 'true',
      role: 'alertdialog'
    }
  }

  get name(): ElementName {
    return ElementName.ALERT_DIALOG
  }
}

export class AlertDialogDescriptionElement extends BaseElement {
  render() {
    return html`<slot></slot>`
  }

  get name(): ElementName {
    return ElementName.ALERT_DIALOG_DESCRIPTION
  }
}

export class AlertDialogLabelElement extends BaseElement {
  render() {
    return html`<slot></slot>`
  }

  get name(): ElementName {
    return ElementName.ALERT_DIALOG_LABEL
  }
}
