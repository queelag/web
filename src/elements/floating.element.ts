import {
  arrow,
  autoUpdate,
  AutoUpdateOptions,
  computePosition,
  ComputePositionConfig,
  ComputePositionReturn,
  Middleware,
  Placement,
  Platform,
  Strategy
} from '@floating-ui/dom'
import { tcp } from '@queelag/core'
import { Internal } from '../decorators/internal'
import { Property } from '../decorators/property'
import { BaseElement } from './base.element'

export class FloatingElement extends BaseElement {
  private _arrowElement?: HTMLElement
  private _referenceElement?: HTMLElement

  @Property({ type: Boolean, attribute: 'ancestor-scroll', reflect: true })
  ancestorScroll?: boolean

  @Property({ type: Boolean, attribute: 'ancestor-resize', reflect: true })
  ancestorResize?: boolean

  @Property({ type: Boolean, attribute: 'animation-frame', reflect: true })
  animationFrame?: boolean

  @Property({ type: Number, attribute: 'arrow-padding', reflect: true })
  arrowPadding?: number

  @Internal()
  cleanup?: Function

  @Property({ type: Boolean, attribute: 'element-resize', reflect: true })
  elementResize?: boolean

  @Property({ type: Array, reflect: true })
  middlewares?: Middleware[]

  @Property({ type: String, reflect: true })
  placement?: Placement

  @Property({ type: Object, reflect: true })
  platform?: Platform

  @Property({ type: String, reflect: true })
  strategy?: Strategy

  connectedCallback(): void {
    super.connectedCallback()
    this.computePosition()
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.cleanup && this.cleanup()
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)
    this.computePosition()
  }

  computePosition = async (): Promise<void> => {
    let position: ComputePositionReturn | Error

    if (!this.referenceElement) {
      this.cleanup && this.cleanup()
      this.cleanup = undefined

      return
    }

    position = await tcp(() => computePosition(this.referenceElement as HTMLElement, this, this.computePositionConfig))
    if (position instanceof Error) return

    this.style.left = position.x + 'px'
    this.style.top = position.y + 'px'

    if (this.arrowElement && position.middlewareData.arrow) {
      let side: string | undefined

      this.arrowElement.style.left = position.middlewareData.arrow.x + 'px'
      this.arrowElement.style.top = position.middlewareData.arrow.y + 'px'

      side = this.getArrowStaticSide(position)
      if (!side) return

      this.arrowElement.style[side as any] = '-4px'
    }

    if (!this.cleanup) {
      this.cleanup = autoUpdate(this.referenceElement, this, this.computePosition, this.autoUpdateOptions)
    }
  }

  onSlotChange(): void {
    super.onSlotChange()
    this.computePosition()
  }

  getArrowStaticSide(position: ComputePositionReturn): string | undefined {
    return {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right'
    }[position.placement.split('-')[0]]
  }

  get autoUpdateOptions(): Partial<AutoUpdateOptions> {
    let options: Partial<AutoUpdateOptions>

    options = {
      ancestorResize: this.ancestorResize,
      ancestorScroll: this.ancestorScroll,
      animationFrame: this.animationFrame,
      elementResize: this.elementResize
    }

    for (let key in options) {
      // @ts-ignore
      typeof options[key] === 'undefined' && delete options[key]
    }

    return options
  }

  get computePositionConfig(): Partial<ComputePositionConfig> {
    let options: Partial<ComputePositionConfig>

    options = {
      middleware: this.middlewares || [],
      placement: this.placement,
      platform: this.platform,
      strategy: this.strategy
    }

    for (let key in options) {
      // @ts-ignore
      typeof options[key] === 'undefined' && delete options[key]
    }

    if (this.arrowElement) {
      options.middleware = options.middleware || []
      options.middleware.push(arrow({ element: this.arrowElement, padding: this.arrowPadding }))
    }

    return options
  }

  get arrowElement(): HTMLElement | undefined {
    return this._arrowElement
  }

  set arrowElement(element: HTMLElement | undefined) {
    this._arrowElement = element
    this.computePosition()
  }

  get referenceElement(): HTMLElement | undefined {
    return this._referenceElement
  }

  set referenceElement(element: HTMLElement | undefined) {
    this._referenceElement = element
    this.computePosition()
  }
}
