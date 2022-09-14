import { AriaDisclosureButtonController } from '../controllers/aria-disclosure/aria.disclosure.button.controller'
import { AriaDisclosurePanelController } from '../controllers/aria-disclosure/aria.disclosure.panel.controller'
import { AriaDisclosureSectionController } from '../controllers/aria-disclosure/aria.disclosure.section.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-disclosure': DisclosureElement
    'q-disclosure-button': DisclosureButtonElement
    'q-disclosure-panel': DisclosurePanelElement
    'q-disclosure-section': DisclosureSectionElement
  }
}

@CustomElement('q-disclosure')
export class DisclosureElement extends BaseElement {
  @QueryAll('q-disclosure-button')
  buttonElements!: DisclosureButtonElement[]

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
        event.preventDefault()
        event.stopPropagation()

        this.focusedButtonElement?.click()
        break
    }
  }

  get focusedButtonElement(): DisclosureButtonElement | undefined {
    return this.buttonElements.find((button: DisclosureButtonElement) => button === document.activeElement)
  }

  get name(): ElementName {
    return ElementName.DISCLOSURE
  }
}

@CustomElement('q-disclosure-section')
export class DisclosureSectionElement extends BaseElement {
  protected aria: AriaDisclosureSectionController = new AriaDisclosureSectionController(this)

  @Query('q-disclosure-button')
  buttonElement!: DisclosureButtonElement

  @Property({ type: Boolean, reflect: true })
  expanded?: boolean

  @Query('q-disclosure-panel')
  panelElement?: DisclosurePanelElement

  collapse(): void {
    this.expanded = false
  }

  expand(): void {
    this.expanded = true
  }

  get name(): ElementName {
    return ElementName.DISCLOSURE_SECTION
  }
}

@CustomElement('q-disclosure-button')
export class DisclosureButtonElement extends BaseElement {
  protected aria: AriaDisclosureButtonController = new AriaDisclosureButtonController(this)

  @Closest('q-disclosure-section')
  sectionElement!: DisclosureSectionElement

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.addEventListener('click', this.onClick)
  }

  onClick = (): void => {
    this.sectionElement.expanded = !this.sectionElement.expanded
    ElementLogger.verbose(this.uid, 'onClick', `The section has been ${this.sectionElement.expanded ? 'expanded' : 'collapsed'}.`)
  }

  get name(): ElementName {
    return ElementName.DISCLOSURE_BUTTON
  }
}

@CustomElement('q-disclosure-panel')
export class DisclosurePanelElement extends BaseElement {
  protected aria: AriaDisclosurePanelController = new AriaDisclosurePanelController(this)

  get name(): ElementName {
    return ElementName.DISCLOSURE_PANEL
  }
}
