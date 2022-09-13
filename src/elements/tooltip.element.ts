import { css } from 'lit'
import { AriaTooltipContentController } from '../controllers/aria-tooltip/aria.tooltip.content.controller'
import { AriaTooltipController } from '../controllers/aria-tooltip/aria.tooltip.controller'
import { AriaTooltipTriggerController } from '../controllers/aria-tooltip/aria.tooltip.trigger.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'
import { FloatingElement } from './floating.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-tooltip': TooltipElement
    'queelag-tooltip-arrow': TooltipArrowElement
    'queelag-tooltip-content': TooltipContentElement
    'queelag-tooltip-trigger': TooltipTriggerElement
  }
}

@CustomElement('queelag-tooltip')
export class TooltipElement extends BaseElement {
  protected aria: AriaTooltipController = new AriaTooltipController(this)

  @Query('queelag-tooltip-arrow')
  arrowElement?: TooltipArrowElement

  @Query('queelag-tooltip-content')
  contentElement?: TooltipContentElement

  @Property({ type: Boolean, reflect: true })
  focusable?: boolean

  @Query('queelag-tooltip-trigger')
  triggerElement!: TooltipTriggerElement

  @Property({ type: Boolean, reflect: true })
  visible?: boolean

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== KeyboardEventKey.ESCAPE) {
      return
    }

    this.visible = false
    ElementLogger.verbose(this.uid, 'onKeyDown', `The tooltip has been hidden.`)
  }

  get name(): ElementName {
    return ElementName.TOOLTIP
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

@CustomElement('queelag-tooltip-arrow')
export class TooltipArrowElement extends BaseElement {
  get name(): ElementName {
    return ElementName.TOOLTIP_ARROW
  }

  static styles = [
    super.styles,
    css`
      :host {
        left: 0;
        position: absolute;
        top: 0;
      }
    `
  ]
}

@CustomElement('queelag-tooltip-content')
export class TooltipContentElement extends FloatingElement {
  protected aria: AriaTooltipContentController = new AriaTooltipContentController(this)

  @Closest('queelag-tooltip')
  tooltipElement!: TooltipElement

  get arrowElement(): TooltipArrowElement | undefined {
    return this.querySelector('queelag-tooltip-arrow') || undefined
  }

  get name(): ElementName {
    return ElementName.TOOLTIP_CONTENT
  }

  get referenceElement(): TooltipTriggerElement | undefined {
    return this.tooltipElement.triggerElement
  }

  static styles = [
    super.styles,
    css`
      :host {
        left: 0;
        position: absolute;
        top: 0;
      }
    `
  ]
}

@CustomElement('queelag-tooltip-trigger')
export class TooltipTriggerElement extends BaseElement {
  protected aria: AriaTooltipTriggerController = new AriaTooltipTriggerController(this)

  @Closest('queelag-tooltip')
  tooltipElement!: TooltipElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('blur', this.onBlur)
    this.addEventListener('click', this.onClick)
    this.addEventListener('focus', this.onFocus)
    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseout', this.onMouseOut)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('blur', this.onBlur)
    this.removeEventListener('click', this.onClick)
    this.removeEventListener('focus', this.onFocus)
    this.removeEventListener('mouseenter', this.onMouseEnter)
    this.removeEventListener('mouseout', this.onMouseOut)
  }

  onBlur = (): void => {
    this.tooltipElement.visible = false
    ElementLogger.verbose(this.uid, 'onBlur', `The tooltip has been hidden.`)
  }

  onClick = (): void => {
    this.tooltipElement.visible = true
    ElementLogger.verbose(this.uid, 'onClick', `The tooltip has been shown.`)
  }

  onFocus = (): void => {
    this.tooltipElement.visible = true
    ElementLogger.verbose(this.uid, 'onFocus', `The tooltip has been shown.`)
  }

  onMouseEnter = (): void => {
    this.tooltipElement.visible = true
    ElementLogger.verbose(this.uid, 'onMouseEnter', `The tooltip has been shown.`)
  }

  onMouseOut = (): void => {
    this.tooltipElement.visible = false
    ElementLogger.verbose(this.uid, 'onMouseOut', `The tooltip has been hidden.`)
  }

  get name(): ElementName {
    return ElementName.TOOLTIP_TRIGGER
  }

  static styles = [
    super.styles,
    css`
      :host {
        z-index: 1;
      }
    `
  ]
}
