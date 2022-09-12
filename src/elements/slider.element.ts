import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { QueryAll } from '../decorators/query.all'
import { ElementName } from '../definitions/enums'
import { BaseElement } from './base.element'

@CustomElement('queelag-slider')
export class SliderElement extends BaseElement {
  @Property({ type: Number, reflect: true })
  step?: number

  @Property({ type: Number, attribute: 'step-decimals', reflect: true })
  stepDecimals?: number

  @QueryAll('queelag-slider-thumb')
  thumbElements!: SliderThumbElement[]

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.onClick)
  }

  onClick = (): void => {}

  get name(): ElementName {
    return ElementName.SLIDER
  }

  get value(): number[] {
    return this.thumbElements.map((thumb: SliderThumbElement) => thumb.value || 0)
  }
}

@CustomElement('queelag-slider-thumb')
export class SliderThumbElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  movable?: boolean

  @Property({ type: Number, reflect: true })
  value?: number

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('keydown', this.onKeyDown)
    this.addEventListener('mousedown', this.onMouseDown)
    this.addEventListener('touchend', this.onTouchEnd)
    this.addEventListener('touchmove', this.onTouchMove)
    this.addEventListener('touchstart', this.onTouchStart)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('keydown', this.onKeyDown)
    this.removeEventListener('mousedown', this.onMouseDown)
    this.removeEventListener('touchend', this.onTouchEnd)
    this.removeEventListener('touchmove', this.onTouchMove)
    this.removeEventListener('touchstart', this.onTouchStart)
  }

  onKeyDown = (event: KeyboardEvent): void => {}

  onMouseDown = (event: MouseEvent): void => {}

  onTouchStart = (event: TouchEvent): void => {}

  onTouchMove = (event: TouchEvent): void => {}

  onTouchEnd = (event: TouchEvent): void => {}

  get name(): ElementName {
    return ElementName.SLIDER_THUMB
  }
}
