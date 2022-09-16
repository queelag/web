import { CustomElement } from '@/decorators/custom.element'
import { Property } from '@/decorators/property'
import { ElementName } from '@/definitions/enums'
import { css } from 'lit'
import { html } from 'lit-html'
import { BaseElement } from './core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-avatar': AvatarElement
  }
}

@CustomElement('q-avatar')
export class AvatarElement extends BaseElement {
  @Property({ type: String, reflect: true })
  icon?: string

  @Property({ type: String, reflect: true })
  image?: string

  @Property({ type: String, reflect: true })
  text?: string

  render() {
    return html`
      <div style=${this.styleMap}>
        <slot></slot>
      </div>
      ${this.shapeHTML}
    `
  }

  get name(): ElementName {
    return ElementName.AVATAR
  }

  static styles = [
    super.styles,
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
