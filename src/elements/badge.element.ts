import { getLimitedNumber, parseNumber } from '@queelag/core'
import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-badge': BadgeElement
  }
}

@CustomElement('queelag-badge')
export class BadgeElement extends BaseElement {
  @Property({ type: Boolean, attribute: 'is-number', reflect: true })
  is_number?: boolean

  @Property({ type: Number, reflect: true })
  maximum?: number

  @Property({ type: Number, reflect: true })
  minimum?: number

  private _value?: string

  render() {
    return html`
      <div style=${this.style_map}><slot>${this.value}</slot></div>
      ${this.shape_html}
    `
  }

  @Property({ type: String, reflect: true })
  get value(): string {
    if (this.is_number) {
      return getLimitedNumber(parseNumber(this._value || '0'), this.minimum, this.maximum).toString()
    }

    return this._value || ''
  }

  set value(value: string | undefined) {
    let old: string | undefined

    old = this._value
    this._value = value

    this.requestUpdate('value', old)
  }

  static styles = [
    super.styles as CSSResult,
    css`
      div {
        align-items: center;
        display: inline-flex;
        justify-content: center;
        overflow: hidden;
      }
    `
  ]
}
