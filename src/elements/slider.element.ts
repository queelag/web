import { getLimitedNumber, isNumberMultipleOf, toFixedNumber } from '@queelag/core'
import { css, html } from 'lit'
import { AriaSliderController } from '../controllers/aria-slider/aria.slider.controller'
import { AriaSliderThumbController } from '../controllers/aria-slider/aria.slider.thumb.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { QueryAll } from '../decorators/query.all'
import {
  DEFAULT_SLIDER_DECIMALS,
  DEFAULT_SLIDER_MAXIMUM,
  DEFAULT_SLIDER_MINIMUM,
  DEFAULT_SLIDER_MINIMUM_DISTANCE,
  DEFAULT_SLIDER_ORIENTATION,
  DEFAULT_SLIDER_STEP,
  DEFAULT_SLIDER_THUMB_VALUE
} from '../definitions/constants'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { Orientation } from '../definitions/types'
import { SliderChangeEvent } from '../events/slider.change.event'
import { SliderThumbMoveEvent } from '../events/slider.thumb.move.event'
import { ElementLogger } from '../loggers/element.logger'
import { getSliderThumbElementPercentage, getSliderThumbElementStyleLeft, getSliderThumbElementStyleTop } from '../utils/slider.element.utils'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-slider': SliderElement
    'q-slider-thumb': SliderThumbElement
  }
}

@CustomElement('q-slider')
export class SliderElement extends BaseElement {
  protected aria: AriaSliderController = new AriaSliderController(this)

  @Property({ type: Number, reflect: true })
  decimals?: number

  @Property({ type: Boolean, attribute: 'disable-swap', reflect: true })
  disableSwap?: boolean

  @Property({ type: Number, reflect: true })
  maximum?: number

  @Property({ type: Number, reflect: true })
  minimum?: number

  @Property({ type: Number, attribute: 'minimum-distance', reflect: true })
  minimumDistance?: number

  @Property({ type: String, reflect: true })
  orientation?: Orientation

  @Property({ type: Number, reflect: true })
  step?: number

  @QueryAll('q-slider-thumb')
  thumbElements!: SliderThumbElement[]

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.onClick)
  }

  onClick = (event: MouseEvent): void => {
    if (this.hasMultipleThumbs) {
      return
    }

    this.thumbElements[0].setValueByCoordinates(event.clientX, event.clientY, true)
    ElementLogger.verbose(this.uid, 'onClick', `The value has been set through the coordinates.`, [event.clientX, event.clientY, this.thumbElements[0].value])

    this.thumbElements[0].focus()
    ElementLogger.verbose(this.uid, 'onClick', `The thumb has been focused.`)

    this.thumbElements[0].computePosition()

    this.dispatchEvent(new SliderThumbMoveEvent(this.thumbElements[0].value, this.thumbElements[0].percentage))
    this.dispatchEvent(new SliderChangeEvent(this.values, this.percentages))
  }

  get name(): ElementName {
    return ElementName.SLIDER
  }

  get percentages(): number[] {
    return this.thumbElements.map((thumb: SliderThumbElement) => thumb.percentage)
  }

  get values(): number[] {
    return this.thumbElements.map((thumb: SliderThumbElement) => thumb.value ?? thumb.defaultValue ?? DEFAULT_SLIDER_THUMB_VALUE)
  }

  get hasSingleThumb(): boolean {
    return this.thumbElements.length === 1
  }

  get hasMultipleThumbs(): boolean {
    return this.thumbElements.length > 1
  }

  get isOrientationHorizontal(): boolean {
    return this.orientation !== 'vertical'
  }

  get isOrientationVertical(): boolean {
    return this.orientation === 'vertical'
  }

  static styles = [
    super.styles,
    css`
      :host {
        position: relative;
      }
    `
  ]
}

@CustomElement('q-slider-thumb')
export class SliderThumbElement extends BaseElement {
  protected aria: AriaSliderThumbController = new AriaSliderThumbController(this)

  @Property({ type: Number, attribute: 'default-value', reflect: true })
  defaultValue?: number

  @Property({ type: Boolean, attribute: 'disable-compute-position', reflect: true })
  disableComputePosition?: boolean

  @Property({ type: Boolean, reflect: true })
  movable?: boolean

  @Closest('q-slider')
  rootElement!: SliderElement

  private _value?: number

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('keydown', this.onKeyDown)
    this.addEventListener('mousedown', this.onMouseDown)
    this.addEventListener('touchend', this.onTouchEnd)
    this.addEventListener('touchmove', this.onTouchMove, { passive: true })
    this.addEventListener('touchstart', this.onTouchStart, { passive: true })
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('keydown', this.onKeyDown)
    this.removeEventListener('mousedown', this.onMouseDown)
    this.removeEventListener('touchend', this.onTouchEnd)
    this.removeEventListener('touchmove', this.onTouchMove)
    this.removeEventListener('touchstart', this.onTouchStart)
  }

  onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case KeyboardEventKey.ARROW_LEFT:
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.PAGE_DOWN:
      case KeyboardEventKey.PAGE_UP:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.END:
        event.preventDefault()
        event.stopPropagation()
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_LEFT:
      case KeyboardEventKey.ARROW_UP:
        this.value = getLimitedNumber(
          (this.value ?? DEFAULT_SLIDER_THUMB_VALUE) - (this.rootElement.step ?? DEFAULT_SLIDER_STEP),
          this.rootElement.minimum ?? DEFAULT_SLIDER_MINIMUM,
          this.rootElement.maximum ?? DEFAULT_SLIDER_MAXIMUM
        )
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT or ARROW_DOWN', `The value has been decreased.`, [this.value])

        break
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.ARROW_DOWN:
        this.value = getLimitedNumber(
          (this.value ?? DEFAULT_SLIDER_THUMB_VALUE) + (this.rootElement.step ?? DEFAULT_SLIDER_STEP),
          this.rootElement.minimum ?? DEFAULT_SLIDER_MINIMUM,
          this.rootElement.maximum ?? DEFAULT_SLIDER_MAXIMUM
        )
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT or ARROW_UP', `The value has been increased.`, [this.value])

        break
      case KeyboardEventKey.PAGE_DOWN:
        this.value = getLimitedNumber(
          (this.value ?? DEFAULT_SLIDER_THUMB_VALUE) - (this.rootElement.step ?? DEFAULT_SLIDER_STEP) * 10,
          this.rootElement.minimum ?? DEFAULT_SLIDER_MINIMUM,
          this.rootElement.maximum ?? DEFAULT_SLIDER_MAXIMUM
        )
        ElementLogger.verbose(this.uid, 'onKeyDown', 'PAGE_DOWN', `The value has been decreased.`, [this.value])

        break
      case KeyboardEventKey.PAGE_UP:
        this.value = getLimitedNumber(
          (this.value ?? DEFAULT_SLIDER_THUMB_VALUE) + (this.rootElement.step ?? DEFAULT_SLIDER_STEP) * 10,
          this.rootElement.minimum ?? DEFAULT_SLIDER_MINIMUM,
          this.rootElement.maximum ?? DEFAULT_SLIDER_MAXIMUM
        )
        ElementLogger.verbose(this.uid, 'onKeyDown', 'PAGE_UP', `The value has been increased.`, [this.value])

        break
      case KeyboardEventKey.HOME:
        this.value = this.rootElement.minimum ?? DEFAULT_SLIDER_MINIMUM
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The value has been set to the minimum.`, [this.value])

        break
      case KeyboardEventKey.END:
        this.value = this.rootElement.maximum ?? DEFAULT_SLIDER_MAXIMUM
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The value has been set to the maximum.`, [this.value])

        break
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_LEFT:
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.PAGE_DOWN:
      case KeyboardEventKey.PAGE_UP:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.END:
        this.computePosition()

        this.dispatchEvent(new SliderThumbMoveEvent(this.value ?? DEFAULT_SLIDER_THUMB_VALUE, this.percentage))
        this.rootElement.dispatchEvent(new SliderChangeEvent(this.rootElement.values, this.rootElement.percentages))
    }
  }

  onMouseDown = (event: MouseEvent): void => {
    this.movable = true
    ElementLogger.verbose(this.uid, 'onMouseDown', `The thumb has been unlocked.`)

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)

    ElementLogger.verbose(this.uid, 'onMouseDown', `The mousemove and mouseup listeners have been registered.`)
  }

  onTouchStart = (): void => {
    this.movable = true
    ElementLogger.debug(this.uid, 'onTouchStart', `The thumb has been unlocked.`)
  }

  onTouchMove = (event: TouchEvent): void => {
    this.onMouseMoveOrTouchMove(event.touches[0].clientX, event.touches[0].clientY)
  }

  onTouchEnd = (): void => {
    this.onMouseUpOrTouchEnd()
  }

  onMouseMove = (event: MouseEvent): void => {
    this.onMouseMoveOrTouchMove(event.clientX, event.clientY)
  }

  onMouseUp = (): void => {
    this.onMouseUpOrTouchEnd()
  }

  onMouseMoveOrTouchMove(x: number, y: number): void {
    if (!this.movable) {
      ElementLogger.verbose(this.uid, 'onMouseMoveOrTouchMove', `The thumb is not movable.`)
      return
    }

    this.setValueByCoordinates(x, y)
    this.computePosition()

    this.dispatchEvent(new SliderThumbMoveEvent(this.value ?? DEFAULT_SLIDER_THUMB_VALUE, this.percentage))
    this.rootElement.dispatchEvent(new SliderChangeEvent(this.rootElement.values, this.rootElement.percentages))
  }

  onMouseUpOrTouchEnd(): void {
    ElementLogger.verbose(this.uid, 'onMouseUpOrTouchEnd', `The value has been set.`, [this.value])

    this.movable = false
    ElementLogger.verbose(this.uid, 'onMouseUpOrTouchEnd', `The thumb has been locked.`)

    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)

    ElementLogger.verbose(this.uid, 'onMouseUpOrTouchEnd', `The mousemove and mouseup document listeners have been removed.`)
  }

  computePosition(): void {
    if (this.disableComputePosition) {
      return
    }

    this.style.left = getSliderThumbElementStyleLeft(this.percentage, this.rootElement.orientation)
    this.style.top = getSliderThumbElementStyleTop(this.percentage, this.rootElement.orientation)
  }

  setValueByCoordinates(x: number, y: number, round: boolean = false): void {
    let percentage: number

    percentage = this.getPercentageByCoordinates(x, y, round)
    if (percentage < 0) return

    this.setValueByPercentage(percentage)
  }

  setValueByPercentage(percentage: number): void {
    let decimals: number, maximum: number, minimum: number, step: number, value: number

    decimals = this.rootElement.decimals ?? DEFAULT_SLIDER_DECIMALS
    maximum = this.rootElement.maximum ?? DEFAULT_SLIDER_MAXIMUM
    minimum = this.rootElement.minimum ?? DEFAULT_SLIDER_MINIMUM
    step = this.rootElement.step ?? DEFAULT_SLIDER_STEP

    value = getLimitedNumber(toFixedNumber(((maximum - minimum) * percentage) / 100 + minimum, decimals), minimum, maximum)
    if (!isNumberMultipleOf(value, step)) return

    this.value = value
  }

  getPercentageByCoordinates(x: number, y: number, round: boolean = false): number {
    let decimals: number, orientation: Orientation, rect: DOMRect, step: number, percentage: number

    decimals = this.rootElement.decimals ?? DEFAULT_SLIDER_DECIMALS
    orientation = this.rootElement.orientation ?? DEFAULT_SLIDER_ORIENTATION
    rect = this.rootElement.getBoundingClientRect()
    step = this.rootElement.step ?? DEFAULT_SLIDER_STEP

    switch (orientation) {
      case 'horizontal':
        percentage = ((x - rect.left) / rect.width) * 100
        break
      case 'vertical':
        percentage = ((y - rect.top) / rect.height) * 100
        break
    }

    percentage = getLimitedNumber(toFixedNumber(percentage, decimals), 0, 100)
    if (!isNumberMultipleOf(percentage, step) && !round) return -1

    if (round) {
      percentage = getLimitedNumber(toFixedNumber(Math[percentage > this.percentage ? 'floor' : 'ceil'](percentage / step) * step, decimals), 0, 100)
    }

    return percentage
  }

  render() {
    return html`
      <div style=${this.styleMap}></div>
      ${this.shapeHTML}
    `
  }

  get index(): number {
    return this.rootElement.thumbElements.indexOf(this)
  }

  get name(): ElementName {
    return ElementName.SLIDER_THUMB
  }

  get percentage(): number {
    return getSliderThumbElementPercentage(this.value, this.rootElement.minimum, this.rootElement.maximum, this.rootElement.decimals)
  }

  get value(): number | undefined {
    return this._value ?? this.defaultValue
  }

  @Property({ type: Number, reflect: true })
  set value(value: number | undefined) {
    let old: number | undefined

    if (this.rootElement.disableSwap && this.rootElement.hasMultipleThumbs) {
      let pthumb: SliderThumbElement | undefined, nthumb: SliderThumbElement | undefined, svalue: number, mdistance: number

      pthumb = this.rootElement.thumbElements[this.index - 1]
      nthumb = this.rootElement.thumbElements[this.index + 1]
      svalue = value ?? DEFAULT_SLIDER_THUMB_VALUE
      mdistance = this.rootElement.minimumDistance ?? DEFAULT_SLIDER_MINIMUM_DISTANCE

      if (pthumb && svalue < (pthumb.value ?? Number.MIN_SAFE_INTEGER) + mdistance) {
        return
      }

      if (nthumb && svalue > (nthumb.value ?? Number.MAX_SAFE_INTEGER) - mdistance) {
        return
      }
    }

    old = this._value
    this._value = value

    this.requestUpdate('value', old)
  }

  static styles = [
    super.styles,
    css`
      :host {
        cursor: pointer;
        left: 0;
        position: absolute;
        top: 0;
        touch-action: none;
        user-select: none;
        z-index: 1;
      }

      :host([aria-orientation='horizontal']) {
        transform: translateX(-50%);
      }

      :host([aria-orientation='vertical']) {
        transform: translateY(-50%);
      }

      div {
        display: inline-flex;
        height: 100%;
        width: 100%;
      }
    `
  ]
}
