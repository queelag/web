import { noop, tcp } from '@queelag/core'
import { html } from 'lit'
import { customElement } from 'lit/decorators/custom-element.js'
import { property } from 'lit/decorators/property.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { BaseElement } from '../classes/base.element'
import { ElementName } from '../definitions/enums'
import { ButtonType, ButtonVariant } from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'

@customElement('queelag-button')
export class ButtonElement extends BaseElement {
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  @property({ type: Boolean, reflect: true })
  icon: boolean = false

  @property({ type: Boolean, reflect: true })
  spinning: boolean = false

  @property({ type: String, reflect: true })
  type?: ButtonType

  @property({ type: String })
  variant?: ButtonVariant

  @property({ type: Object })
  _onClick: Function = noop

  constructor() {
    super()
    this.construct(ElementName.BUTTON)
  }

  async onClick(event: PointerEvent) {
    if (this.disabled) {
      ElementLogger.warn(this.qid, 'onClick', `Execution stopped, this button is disabled.`)
      return
    }

    this.disabled = true
    this.spinning = true
    ElementLogger.verbose(this.qid, 'onClick', `The disabled and spinning properties have been set to true.`)

    await tcp(() => this._onClick(event))
    ElementLogger.verbose(this.qid, 'onClick', `The ${this._onClick} function has been executed.`)

    this.spinning = false
    this.disabled = false
    ElementLogger.verbose(this.qid, 'onClick', `The disabled and spinning properties have been set to false.`)
  }

  render() {
    return html`<button ?disabled="${this.disabled}" @click="${this.onClick}" type="${ifDefined(this.type)}">
      <slot></slot>
    </button>`
  }
}
