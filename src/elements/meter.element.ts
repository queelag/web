import { getLimitedNumber, getNumberPercentage } from '@queelag/core'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ifdef } from '../directives/if.defined'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-meter': MeterElement
  }
}

@CustomElement('queelag-meter')
export class MeterElement extends BaseElement {
  @Property({ type: Number, reflect: true })
  low?: number

  @Property({ type: Number, reflect: true })
  high?: number

  @Property({ type: Number, reflect: true })
  maximum?: number

  @Property({ type: Number, reflect: true })
  minimum?: number

  @Property({ type: Boolean, reflect: true })
  native?: boolean

  @Property({ type: Number, reflect: true })
  optimum?: number

  @Property({ type: Boolean, reflect: true })
  round?: boolean

  private _value?: number

  render() {
    if (this.native) {
      return html`
        <meter
          min=${ifdef(this.minimum)}
          max=${ifdef(this.maximum)}
          low=${ifdef(this.low)}
          high=${ifdef(this.high)}
          optimum=${ifdef(this.optimum)}
          style=${this.style_map}
          value=${ifdef(this._value)}
        >
          <slot></slot>
        </meter>
      `
    }

    return html`
      <div
        aria-valuemax=${ifdef(this.maximum)}
        aria-valuemin=${ifdef(this.minimum)}
        aria-valuenow=${ifdef(this.value)}
        role=${this.div_element_role}
        style=${this.style_map}
      >
        <slot></slot>
      </div>
      ${this.shape_html}
    `
  }

  private get div_element_role(): any {
    return 'meter'
  }

  get percentage(): number {
    return getNumberPercentage(this.value || 0, this.minimum, this.maximum, this.round)
  }

  @Property({ type: Number, reflect: true })
  get value(): number {
    return getLimitedNumber(this._value || 0, this.minimum, this.maximum)
  }

  set value(value: number | undefined) {
    let old: number | undefined

    old = this._value
    this._value = value

    this.requestUpdate('value', old)
  }
}
