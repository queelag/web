import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { AriaDialogElement } from '../elements/aria/aria.dialog.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaDialogController implements ReactiveController {
  alert: boolean

  constructor(private host: ReactiveControllerHost & AriaDialogElement, alert: boolean = false) {
    this.alert = alert
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-modal', 'true')
    setImmutableElementAttribute(this.host, 'aria-describedby', this.host.descriptionID)
    setImmutableElementAttribute(this.host, 'aria-labelledby', this.host.labelID)
    setImmutableElementAttribute(this.host, 'role', this.alert ? 'alertdialog' : 'dialog')

    if (this.host.descriptionElement) {
      setImmutableElementAttribute(this.host.descriptionElement, 'id', this.host.descriptionID)
    }

    if (this.host.labelElement) {
      setImmutableElementAttribute(this.host.labelElement, 'id', this.host.labelID)
    }
  }
}
