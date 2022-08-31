import { FormFieldElement } from '../classes/form.field.element'
import { CustomElement } from '../decorators/custom.element'
import { ElementName } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'

@CustomElement('queelag-checkbox')
export class CheckBoxElement extends FormFieldElement {
  on_click(): void {
    if (this.disabled) {
      return ElementLogger.warn(this.id, 'on_click', `Execution stopped, disabled is truthy.`)
    }

    this.value = !this.value
    this.touch()
  }

  get name(): ElementName {
    return ElementName.CHECKBOX
  }
}
