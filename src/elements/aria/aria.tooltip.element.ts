import { AriaTooltipContentController, AriaTooltipController, AriaTooltipTriggerController } from '@/controllers/aria.tooltip.controller'
import { Closest } from '@/decorators/closest'
import { CustomElement } from '@/decorators/custom.element'
import { Property } from '@/decorators/property'
import { Query } from '@/decorators/query'
import { ElementName, KeyboardEventKey } from '@/definitions/enums'
import { ElementLogger } from '@/loggers/element.logger'
import { css } from 'lit'
import { BaseElement } from '../core/base.element'
import { FloatingElement } from '../core/floating.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-tooltip': AriaTooltipElement
    'q-aria-tooltip-arrow': AriaTooltipArrowElement
    'q-aria-tooltip-content': AriaTooltipContentElement
    'q-aria-tooltip-trigger': AriaTooltipTriggerElement
  }
}

@CustomElement('q-aria-tooltip')
export class AriaTooltipElement extends BaseElement {
  protected aria: AriaTooltipController = new AriaTooltipController(this)

  @Query('q-aria-tooltip-arrow')
  arrowElement?: AriaTooltipArrowElement

  @Query('q-aria-tooltip-content')
  contentElement?: AriaTooltipContentElement

  @Property({ type: Boolean, reflect: true })
  focusable?: boolean

  @Query('q-aria-tooltip-trigger')
  triggerElement!: AriaTooltipTriggerElement

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

@CustomElement('q-aria-tooltip-arrow')
export class AriaTooltipArrowElement extends BaseElement {
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

@CustomElement('q-aria-tooltip-content')
export class AriaTooltipContentElement extends FloatingElement {
  protected aria: AriaTooltipContentController = new AriaTooltipContentController(this)

  @Closest('q-aria-tooltip')
  tooltipElement!: AriaTooltipElement

  get arrowElement(): AriaTooltipArrowElement | undefined {
    return this.querySelector('q-aria-tooltip-arrow') || undefined
  }

  get name(): ElementName {
    return ElementName.TOOLTIP_CONTENT
  }

  get referenceElement(): AriaTooltipTriggerElement | undefined {
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

@CustomElement('q-aria-tooltip-trigger')
export class AriaTooltipTriggerElement extends BaseElement {
  protected aria: AriaTooltipTriggerController = new AriaTooltipTriggerController(this)

  @Closest('q-aria-tooltip')
  tooltipElement!: AriaTooltipElement

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
