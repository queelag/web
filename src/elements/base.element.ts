import { ID, parseNumber } from '@queelag/core'
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit'
import { DirectiveResult } from 'lit-html/directive'
import { StyleInfo } from 'lit-html/directives/style-map'
import { ElementCollector } from '../collectors/element.collector'
import { Property } from '../decorators/property'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { Layer, Shape, Size } from '../definitions/types'
import { styleMap } from '../directives/style.map'
import { AttributeChangedEvent } from '../events/attribute.changed.event'
import { getElementStyleCompatibleValue, setImmutableElementAttribute } from '../utils/element.utils'
import { getShapeStyleInfo } from '../utils/shape.utils'
import { getSquircleHTML } from '../utils/squircle.utils'

export class BaseElement extends LitElement {
  @Property({ type: String, reflect: true })
  background?: string

  @Property({ type: String, reflect: true })
  height?: string

  @Property({ type: Number, reflect: true })
  layer?: Layer

  @Property({ type: String, reflect: true })
  shape?: Shape

  @Property({ type: Number, attribute: 'shape-rectangle-radius', reflect: true })
  shapeRectangleRadius?: number

  @Property({ type: Number, attribute: 'shape-square-radius', reflect: true })
  shapeSquareRadius?: number

  @Property({ type: Number, attribute: 'shape-squircle-curvature', reflect: true })
  shapeSquircleCurvature?: number

  @Property({ type: Number, attribute: 'shape-squircle-size', reflect: true })
  shapeSquircleSize?: number

  @Property({ type: String, reflect: true })
  size?: Size

  squircleID: string = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.SQUIRCLE })
  uid!: string

  @Property({ type: String, reflect: true })
  width?: string

  connectedCallback(): void {
    super.connectedCallback()
    setImmutableElementAttribute(this, 'uid', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: this.name }))

    ElementCollector.set(this)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    ElementCollector.delete(this)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (Object.is(_old, value)) {
      return
    }

    this.dispatchEvent(new AttributeChangedEvent(name, _old, value))
  }

  onSlotChange(): void {}

  render(): unknown {
    return html`<slot @slotchange=${this.onSlotChange}></slot>`
  }

  // @ts-ignore
  get name(): ElementName {}

  get shapeHTML(): TemplateResult | undefined {
    if (this.shape !== 'squircle') {
      return
    }

    return getSquircleHTML(this.squircleID, this.shapeSquircleSize || this.numericSize, {
      curvature: this.shapeSquircleCurvature
    })
  }

  get shapeStyleInfo(): StyleInfo {
    return getShapeStyleInfo(this.shape, {
      rectangle: { radius: this.shapeRectangleRadius },
      square: { radius: this.shapeSquareRadius },
      squircle: { id: this.squircleID }
    })
  }

  get sizeStyleInfo(): StyleInfo {
    return {
      height: getElementStyleCompatibleValue(this.height || this.size),
      width: getElementStyleCompatibleValue(this.width || this.size)
    }
  }

  get styleInfo(): StyleInfo {
    return { ...this.shapeStyleInfo, ...this.sizeStyleInfo, background: this.background }
  }

  get styleMap(): DirectiveResult {
    return styleMap(this.styleInfo)
  }

  private get numericSize(): number {
    switch (typeof this.size) {
      case 'number':
        return this.size
      case 'string':
        return parseNumber(this.size)
      default:
        return 0
    }
  }

  static styles: CSSResultGroup = css`
    :host {
      display: inline-flex;
    }

    svg.squircle {
      height: 0;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      width: 0;
    }
  `
}
