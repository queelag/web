import { getLimitedNumber, parseNumber } from '@queelag/core'
import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-badge': BadgeElement
  }
}

@CustomElement('q-badge')
export class BadgeElement extends BaseElement {
  @Property({ type: Number, reflect: true })
  maximum?: number

  @Property({ type: Number, reflect: true })
  minimum?: number

  @Property({ type: Boolean, reflect: true })
  numeric?: boolean

  private _value?: string

  render() {
    return html`
      <div style=${this.styleMap}><slot>${this.value}</slot></div>
      ${this.shapeHTML}
    `
  }

  @Property({ type: String, reflect: true })
  get value(): string {
    if (this.numeric) {
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
