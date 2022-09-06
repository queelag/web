import { ID, parseNumber } from '@queelag/core'
import { css, LitElement, TemplateResult } from 'lit'
import { DirectiveResult } from 'lit-html/directive'
import { StyleInfo } from 'lit-html/directives/style-map'
import { ElementCollector } from '../collectors/element.collector'
import { Property } from '../decorators/property'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { ShapeOptions } from '../definitions/interfaces'
import { Constructor, Layer, Shape, Size } from '../definitions/types'
import { styleMap } from '../directives/style.map'
import { AttributeChangedEvent } from '../events/attribute.changed.event'
import { getElementStyleCompatibleValue } from '../utils/dom.utils'
import { getShapeStyleInfo } from '../utils/shape.utils'
import { getSquircleHTML } from '../utils/squircle.utils'

export declare class BaseElementInterface {
  /**
   * Properties
   */
  background?: string
  height?: number | string
  layer?: Layer
  shape?: Shape
  shape_options?: ShapeOptions
  size?: Size
  uid: string
  width?: number | string
  /**
   * Getters
   */
  get name(): ElementName
  get shape_html(): TemplateResult | undefined
  get shape_style_info(): StyleInfo
  get shape_style_map(): DirectiveResult
  get size_style_info(): StyleInfo
  get size_style_map(): DirectiveResult
  get style_info(): StyleInfo
  get style_map(): DirectiveResult
}

export function BaseElementMixin<T extends Constructor<LitElement>>(_: T) {
  class BaseElement extends _ {
    @Property({ type: String, reflect: true })
    background?: string

    @Property({ type: String, reflect: true })
    height?: string

    @Property({ type: Number, reflect: true })
    layer?: Layer

    @Property({ type: String, reflect: true })
    shape?: Shape

    @Property({ type: Number, attribute: 'shape-rectangle-radius', reflect: true })
    shape_rectangle_radius?: number

    @Property({ type: Number, attribute: 'shape-square-radius', reflect: true })
    shape_square_radius?: number

    @Property({ type: Number, attribute: 'shape-squircle-curvature', reflect: true })
    shape_squircle_curvature?: number

    @Property({ type: Number, attribute: 'shape-squircle-size', reflect: true })
    shape_squircle_size?: number

    @Property({ type: String, reflect: true })
    size?: Size

    @Property({ type: String, reflect: true })
    width?: string

    private _squircle_id: string = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.SQUIRCLE })
    private _uid: string = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: this.name })

    connectedCallback(): void {
      super.connectedCallback()
      this.setAttribute('uid', this.uid)

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

    // @ts-ignore
    get name(): ElementName {}

    get shape_html(): TemplateResult | undefined {
      if (this.shape !== 'squircle') {
        return
      }

      return getSquircleHTML(this._squircle_id, this.shape_squircle_size || this.size_as_number, {
        curvature: this.shape_squircle_curvature
      })
    }

    get shape_style_info(): StyleInfo {
      return getShapeStyleInfo(this.shape, {
        rectangle: { radius: this.shape_rectangle_radius },
        square: { radius: this.shape_square_radius },
        squircle: { id: this._squircle_id }
      })
    }

    get shape_style_map(): DirectiveResult {
      return styleMap(this.shape_style_info)
    }

    get size_style_info(): StyleInfo {
      return {
        height: getElementStyleCompatibleValue(this.height || this.size),
        width: getElementStyleCompatibleValue(this.width || this.size)
      }
    }

    get size_style_map(): DirectiveResult {
      return styleMap(this.size_style_info)
    }

    get style_info(): StyleInfo {
      return { ...this.shape_style_info, ...this.size_style_info, background: this.background }
    }

    get style_map(): DirectiveResult {
      return styleMap(this.style_info)
    }

    get uid(): string {
      return this._uid
    }

    set uid(_) {}

    private get size_as_number(): number {
      switch (typeof this.size) {
        case 'number':
          return this.size
        case 'string':
          return parseNumber(this.size)
        default:
          return 0
      }
    }

    static styles = css`
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

  return BaseElement as Constructor<BaseElementInterface> & T
}

export const BaseElement = BaseElementMixin(LitElement)
