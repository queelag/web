import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { BaseElement } from '../classes/base.element'
import { CustomElement } from '../decorators/custom.element'
import { ElementName } from '../definitions/enums'

@CustomElement('queelag-avatar')
export class AvatarElement extends BaseElement {
  render() {
    return html`
      <div style=${this.style_map}>
        <slot></slot>
      </div>
      ${this.shape_html}
    `
  }

  get name(): ElementName {
    return ElementName.AVATAR
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
