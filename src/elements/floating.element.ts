import { computePosition, ComputePositionConfig, Middleware, Placement, Platform, Strategy } from '@floating-ui/dom'
import { Property } from '../decorators/property'
import { State } from '../decorators/state'
import { BaseElement } from './base.element'

export class FloatingElement extends BaseElement {
  @State()
  floatingElement?: HTMLElement

  @Property({ type: Array, reflect: true })
  middleware?: Middleware[]

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

  computePosition(): void {
    if (!this.floatingElement) {
      return
    }

    computePosition(this, this.floatingElement, this.computePositionConfig)
  }

  get computePositionConfig(): Partial<ComputePositionConfig> {
    return {
      middleware: this.middleware,
      placement: this.placement,
      platform: this.platform,
      strategy: this.strategy
    }
  }
}
