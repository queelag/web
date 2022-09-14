import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { QueryAssignedElements } from '../decorators/query.assigned.elements'
import { QueryShadow } from '../decorators/query.shadow'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { SubmitAsyncEvent } from '../events/submit.async.event'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'
import type { CheckBoxElement } from './check.box.element'
import type { FormFieldElement } from './form.field.element'
import type { InputElement } from './input.element'
import type { InputFileElement } from './input.file.element'
import type { SwitchElement } from './switch.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-form': FormElement
  }
}

@CustomElement('q-form')
export class FormElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  disabled?: boolean

  @QueryShadow('form')
  private formElement!: HTMLFormElement

  @QueryAssignedElements({ selector: 'q-checkbox' })
  private slotCheckBoxElements!: CheckBoxElement[]

  @QueryAssignedElements({ selector: 'q-input' })
  private slotInputElements!: InputElement[]

  @QueryAssignedElements({ selector: 'q-input-file' })
  private slotInputFileElements!: InputFileElement[]

  @QueryAssignedElements({ selector: 'q-switch' })
  private slowSwitchElements!: SwitchElement[]

  @Property({ type: Boolean, reflect: true })
  spinning?: boolean

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key !== KeyboardEventKey.ENTER) {
      return
    }

    this.formElement.requestSubmit()
  }

  private onSubmit(event: SubmitEvent): void {
    let valid: boolean = true

    event.preventDefault()
    event.stopPropagation()

    if (this.disabled) {
      return ElementLogger.warn(this.uid, 'onSubmit', `Execution stopped, this form is disabled.`)
    }

    for (let element of this.slotElements) {
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

  private get slotElements(): FormFieldElement[] {
    return [...this.slotCheckBoxElements, ...this.slotInputElements, ...this.slotInputFileElements, ...this.slowSwitchElements]
  }
}
