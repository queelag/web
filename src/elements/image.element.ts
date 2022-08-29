import { html } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { property } from 'lit/decorators/property.js'
import { BaseElement } from '../classes/base.element'

@customElement('queelag-image')
export class ImageElement extends BaseElement {
  @property({ type: String })
  alt?: string

  @property({ type: String })
  height?: string

  @property({ type: String })
  src: string = ''

  @property({ type: String })
  width?: string

  render() {
    return html`<img alt="${ifDefined(this.alt)}" src="${this.src}" />`
  }
}
