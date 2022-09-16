import { CustomElement } from '@/decorators/custom.element'
import { Property } from '@/decorators/property'
import { Orientation } from '@/definitions/types'
import { choose } from '@/directives/choose'
import { html } from 'lit-html'
import { BaseElement } from './core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-divider': DividerElement
  }
}

@CustomElement('q-divider')
export class DividerElement extends BaseElement {
  @Property({ type: String, reflect: true })
  orientation?: Orientation

  render() {
    return choose(
      this.orientation,
      [
        ['horizontal', () => html`<slot name="horizontal"></slot>`],
        ['vertical', () => html`<slot name="vertical"></slot>`]
      ],
      () => html`<slot></slot>`
    )
  }
}
