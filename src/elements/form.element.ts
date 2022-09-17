import { PropertyDeclarations } from 'lit'
import { html } from 'lit-html'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { QueryDeclarations } from '../definitions/interfaces'
import { SubmitAsyncEvent } from '../events/submit.async.event'
import { ElementLogger } from '../loggers/element.logger'
import type { CheckBoxElement } from './check.box.element'
import { BaseElement } from './core/base.element'
import type { FormFieldElement } from './core/form.field.element'
import type { InputElement } from './input.element'
import type { InputFileElement } from './input.file.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-form': FormElement
  }
}

export class FormElement extends BaseElement {
  /**
   * PROPERTIES
   */
  disabled?: boolean
  spinning?: boolean

  /**
   * QUERIES
   */
  formElement!: HTMLFormElement
  slotCheckBoxElements!: CheckBoxElement[]
  slotInputElements!: InputElement[]
  slotInputFileElements!: InputFileElement[]

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
    return [...this.slotCheckBoxElements, ...this.slotInputElements, ...this.slotInputFileElements]
  }

  static properties: PropertyDeclarations = {
    disabled: { type: Boolean, reflect: true },
    spinning: { type: Boolean, reflect: true }
  }

  static queries: QueryDeclarations = {
    formElement: { selector: 'form', shadow: true },
    slotCheckBoxElements: { selector: 'q-checkbox', all: true },
    slotInputElements: { selector: 'q-input', all: true },
    slotInputFileElements: { selector: 'q-input-file', all: true }
  }
}

customElements.define('q-form', FormElement)
