import { getLimitedNumber, getNumberPercentage } from '@queelag/core'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ifdef } from '../directives/if.defined'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-meter': MeterElement
  }
}

@CustomElement('q-meter')
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
          style=${this.styleMap}
          value=${ifdef(this._value)}
        >
          <slot></slot>
        </meter>
      `
    }

    return html`
      <div style=${this.styleMap}>
        <slot></slot>
      </div>
      ${this.shapeHTML}
    `
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
