import { ID } from '@queelag/core'
import { AriaAccordionHeaderController } from '../controllers/aria.accordion.header.controller'
import { AriaAccordionSectionController } from '../controllers/aria.accordion.section.controller'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { HeadingLevel } from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-accordion': AccordionElement
    'queelag-accordion-header': AccordionHeaderElement
    'queelag-accordion-header-button': AccordionHeaderButtonElement
    'queelag-accordion-panel': AccordionPanelElement
    'queelag-accordion-section': AccordionSectionElement
  }
}

@CustomElement('queelag-accordion')
export class AccordionElement extends BaseElement {
  @QueryAll('queelag-accordion-header-button')
  headerButtonElements!: AccordionHeaderButtonElement[]

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (event: KeyboardEvent): void => {
    let index: number

    if (!(event.target instanceof AccordionHeaderButtonElement)) {
      return
    }

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
        event.target.click()
        break
      case KeyboardEventKey.ARROW_DOWN:
        index = this.headerButtonElements.indexOf(event.target)
        if (index < 0) return

        if (index >= this.headerButtonElements.length - 1) {
          this.headerButtonElements[0].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', `The first header button has been focused.`)

          break
        }

        this.headerButtonElements[index + 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', `The next header button has been focused.`)

        break
      case KeyboardEventKey.ARROW_UP:
        index = this.headerButtonElements.indexOf(event.target)
        if (index < 0) return

        if (index === 0) {
          this.headerButtonElements[this.headerButtonElements.length - 1].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', `The last header button has been focused.`)

          break
        }

        this.headerButtonElements[index - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', `The previous header button has been focused.`)

        break
      case KeyboardEventKey.HOME:
        this.headerButtonElements[0].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', `The first header button has been focused.`)

        break
      case KeyboardEventKey.END:
        this.headerButtonElements[this.headerButtonElements.length - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', `The last header button has been focused.`)

        break
    }
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

  @Query('queelag-accordion-header-button')
  headerButtonElement!: AccordionHeaderButtonElement

  @Property({ type: String })
  headerButtonID: string = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.ACCORDION_HEADER_BUTTON })

  @Query('queelag-accordion-panel')
  panelElement!: AccordionPanelElement

  @Property({ type: String })
  panelID: string = ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.ACCORDION_PANEL })

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

@CustomElement('queelag-accordion-header-button')
export class AccordionHeaderButtonElement extends BaseElement {
  get name(): ElementName {
    return ElementName.ACCORDION_HEADER_BUTTON
  }
}

@CustomElement('queelag-accordion-panel')
export class AccordionPanelElement extends BaseElement {
  get name(): ElementName {
    return ElementName.ACCORDION_PANEL
  }
}
