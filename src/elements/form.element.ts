import { LitElement } from 'lit'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAssignedElements } from '../decorators/query.assigned.elements'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { SubmitAsyncEvent } from '../events/submit.async.event'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from '../mixins/base.element'
import { FormFieldElementInterface } from '../mixins/form.field.element'
import type { CheckBoxElement } from './check.box.element'
import type { InputElement } from './input.element'

@CustomElement('queelag-form')
export class FormElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  disabled?: boolean

  @Query('form')
  private form_element!: HTMLFormElement

  @QueryAssignedElements({ selector: 'queelag-checkbox' })
  private slot_checkbox_elements!: CheckBoxElement[]

  @QueryAssignedElements({ selector: 'queelag-input' })
  private slot_input_elements!: InputElement[]

  @Property({ type: Boolean, reflect: true })
  spinning?: boolean

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key !== KeyboardEventKey.ENTER) {
      return
    }

    this.form_element.requestSubmit()
  }

  private onSubmit(event: SubmitEvent): void {
    let valid: boolean = true

    event.preventDefault()
    event.stopPropagation()

    if (this.disabled) {
      return ElementLogger.warn(this.uid, 'onSubmit', `Execution stopped, this form is disabled.`)
    }

    for (let element of this.slot_elements) {
      element.touch()
      valid = valid && element.isValid
    }

    if (valid) {
      this.disabled = true
      this.spinning = true
      ElementLogger.verbose(this.uid, 'onSubmit', `The disabled and spinning properties has been set to true.`)

      this.dispatchEvent(new SubmitAsyncEvent(this.finalize))
      ElementLogger.verbose(this.uid, 'onSubmit', `The "submitasync" event has been dispatched.`)
    }
  }

  finalize = (): void => {
    this.disabled = false
    this.spinning = false
    ElementLogger.verbose(this.uid, 'finalize', `The disabled and spinning properties have been set to false.`)
  }

  render() {
    return html`
      <form @keydown=${this.onKeyDown} @submit=${this.onSubmit} novalidate>
        <slot></slot>
      </form>
    `
  }

  get name(): ElementName {
    return ElementName.FORM
  }

  private get slot_elements(): (LitElement & FormFieldElementInterface)[] {
    return [...this.slot_checkbox_elements, ...this.slot_input_elements]
  }
}
