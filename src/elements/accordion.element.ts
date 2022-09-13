import { AriaAccordionButtonController } from '../controllers/aria-accordion/aria.accordion.button.controller'
import { AriaAccordionHeaderController } from '../controllers/aria-accordion/aria.accordion.header.controller'
import { AriaAccordionPanelController } from '../controllers/aria-accordion/aria.accordion.panel.controller'
import { AriaAccordionSectionController } from '../controllers/aria-accordion/aria.accordion.section.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { HeadingLevel } from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-accordion': AccordionElement
    'queelag-accordion-header': AccordionHeaderElement
    'queelag-accordion-button': AccordionButtonElement
    'queelag-accordion-panel': AccordionPanelElement
    'queelag-accordion-section': AccordionSectionElement
  }
}

@CustomElement('queelag-accordion')
export class AccordionElement extends BaseElement {
  @Property({ type: Boolean, attribute: 'allow-only-one-expanded-section', reflect: true })
  allowOnlyOneExpandedSection?: boolean

  @QueryAll('queelag-accordion-button')
  buttonElements!: AccordionButtonElement[]

  @QueryAll('queelag-accordion-section[expanded]')
  expandedSectionElements!: AccordionSectionElement[]

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

  get focusedButtonElement(): AccordionButtonElement | undefined {
    return this.buttonElements.find((button: AccordionButtonElement) => button === document.activeElement)
  }

  get focusedButtonElementIndex(): number {
    return this.buttonElements.indexOf(document.activeElement as AccordionButtonElement)
  }

  get name(): ElementName {
    return ElementName.ACCORDION
  }
}

@CustomElement('queelag-accordion-section')
export class AccordionSectionElement extends BaseElement {
  protected aria: AriaAccordionSectionController = new AriaAccordionSectionController(this)

  @Property({ type: Boolean, reflect: true })
  collapsable?: boolean

  @Property({ type: Boolean, reflect: true })
  expanded?: boolean

  @Query('queelag-accordion-button')
  buttonElement!: AccordionButtonElement

  @Query('queelag-accordion-panel')
  panelElement?: AccordionPanelElement

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

@CustomElement('queelag-accordion-header')
export class AccordionHeaderElement extends BaseElement {
  protected aria: AriaAccordionHeaderController = new AriaAccordionHeaderController(this)

  @Property({ type: Number, reflect: true })
  level?: HeadingLevel

  get name(): ElementName {
    return ElementName.ACCORDION_HEADER
  }
}

@CustomElement('queelag-accordion-button')
export class AccordionButtonElement extends BaseElement {
  protected aria: AriaAccordionButtonController = new AriaAccordionButtonController(this)

  @Closest('queelag-accordion')
  rootElement!: AccordionElement

  @Closest('queelag-accordion-section')
  sectionElement!: AccordionSectionElement

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

@CustomElement('queelag-accordion-panel')
export class AccordionPanelElement extends BaseElement {
  protected aria: AriaAccordionPanelController = new AriaAccordionPanelController(this)

  get name(): ElementName {
    return ElementName.ACCORDION_PANEL
  }
}
