import {
  AriaAccordionButtonController,
  AriaAccordionHeaderController,
  AriaAccordionPanelController,
  AriaAccordionSectionController
} from '@/controllers/aria.accordion.controller'
import { Closest } from '@/decorators/closest'
import { CustomElement } from '@/decorators/custom.element'
import { Property } from '@/decorators/property'
import { Query } from '@/decorators/query'
import { QueryAll } from '@/decorators/query.all'
import { ElementName, KeyboardEventKey } from '@/definitions/enums'
import { HeadingLevel } from '@/definitions/types'
import { ElementLogger } from '@/loggers/element.logger'
import { BaseElement } from '../core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-accordion': AriaAccordionElement
    'q-aria-accordion-header': AriaAccordionHeaderElement
    'q-aria-accordion-button': AriaAccordionButtonElement
    'q-aria-accordion-panel': AriaAccordionPanelElement
    'q-aria-accordion-section': AriaAccordionSectionElement
  }
}

@CustomElement('q-aria-accordion')
export class AriaAccordionElement extends BaseElement {
  @Property({ type: Boolean, attribute: 'allow-only-one-expanded-section', reflect: true })
  allowOnlyOneExpandedSection?: boolean

  @QueryAll('q-aria-accordion-button')
  buttonElements!: AriaAccordionButtonElement[]

  @QueryAll('q-aria-accordion-section[expanded]')
  expandedSectionElements!: AriaAccordionSectionElement[]

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.END:
        event.preventDefault()
        event.stopPropagation()

        break
    }

    switch (event.key) {
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        this.focusedButtonElement?.click()
        break
      case KeyboardEventKey.ARROW_DOWN:
        if (this.focusedButtonElementIndex < 0) {
          return
        }

        if (this.focusedButtonElementIndex >= this.buttonElements.length - 1) {
          this.buttonElements[0].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', `The first header button has been focused.`)

          break
        }

        this.buttonElements[this.focusedButtonElementIndex + 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', `The next header button has been focused.`)

        break
      case KeyboardEventKey.ARROW_UP:
        if (this.focusedButtonElementIndex < 0) {
          return
        }

        if (this.focusedButtonElementIndex === 0) {
          this.buttonElements[this.buttonElements.length - 1].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', `The last header button has been focused.`)

          break
        }

        this.buttonElements[this.focusedButtonElementIndex - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', `The previous header button has been focused.`)

        break
      case KeyboardEventKey.HOME:
        this.buttonElements[0].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', `The first header button has been focused.`)

        break
      case KeyboardEventKey.END:
        this.buttonElements[this.buttonElements.length - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', `The last header button has been focused.`)

        break
    }
  }

  get focusedButtonElement(): AriaAccordionButtonElement | undefined {
    return this.buttonElements.find((button: AriaAccordionButtonElement) => button === document.activeElement)
  }

  get focusedButtonElementIndex(): number {
    return this.buttonElements.indexOf(document.activeElement as AriaAccordionButtonElement)
  }

  get name(): ElementName {
    return ElementName.ACCORDION
  }
}

@CustomElement('q-aria-accordion-section')
export class AriaAccordionSectionElement extends BaseElement {
  protected aria: AriaAccordionSectionController = new AriaAccordionSectionController(this)

  @Property({ type: Boolean, reflect: true })
  collapsable?: boolean

  @Property({ type: Boolean, reflect: true })
  expanded?: boolean

  @Query('q-aria-accordion-button')
  buttonElement!: AriaAccordionButtonElement

  @Query('q-aria-accordion-panel')
  panelElement?: AriaAccordionPanelElement

  collapse(): void {
    if (!this.collapsable) {
      return
    }

    this.expanded = false
  }

  expand(): void {
    this.expanded = true
  }

  get collapsed(): boolean {
    return !this.expanded
  }

  get name(): ElementName {
    return ElementName.ACCORDION_SECTION
  }
}

@CustomElement('q-aria-accordion-header')
export class AriaAccordionHeaderElement extends BaseElement {
  protected aria: AriaAccordionHeaderController = new AriaAccordionHeaderController(this)

  @Property({ type: Number, reflect: true })
  level?: HeadingLevel

  get name(): ElementName {
    return ElementName.ACCORDION_HEADER
  }
}

@CustomElement('q-aria-accordion-button')
export class AriaAccordionButtonElement extends BaseElement {
  protected aria: AriaAccordionButtonController = new AriaAccordionButtonController(this)

  @Closest('q-aria-accordion')
  rootElement!: AriaAccordionElement

  @Closest('q-aria-accordion-section')
  sectionElement!: AriaAccordionSectionElement

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.onClick)
  }

  onClick = (): void => {
    if (!this.sectionElement.collapsable && this.sectionElement.expanded) {
      ElementLogger.verbose(this.sectionElement.uid, 'onClick', `The section isn't collapsable.`)
      return
    }

    if (this.rootElement.allowOnlyOneExpandedSection && this.rootElement.expandedSectionElements.length > 0) {
      let expanded: boolean = !!this.sectionElement.expanded

      for (let section of this.rootElement.expandedSectionElements) {
        section.collapse()
      }

      if (expanded) {
        return
      }
    }

    this.sectionElement.expanded = !this.sectionElement.expanded
    ElementLogger.verbose(this.uid, 'onClick', `The section has been ${this.sectionElement.expanded ? 'expanded' : 'collapsed'}.`)
  }

  get name(): ElementName {
    return ElementName.ACCORDION_BUTTON
  }
}

@CustomElement('q-aria-accordion-panel')
export class AriaAccordionPanelElement extends BaseElement {
  protected aria: AriaAccordionPanelController = new AriaAccordionPanelController(this)

  get name(): ElementName {
    return ElementName.ACCORDION_PANEL
  }
}
