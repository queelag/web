import { AriaDisclosureButtonController, AriaDisclosurePanelController, AriaDisclosureSectionController } from '@/controllers/aria.disclosure.controller'
import { Closest } from '@/decorators/closest'
import { CustomElement } from '@/decorators/custom.element'
import { Property } from '@/decorators/property'
import { Query } from '@/decorators/query'
import { QueryAll } from '@/decorators/query.all'
import { ElementName, KeyboardEventKey } from '@/definitions/enums'
import { ElementLogger } from '@/loggers/element.logger'
import { BaseElement } from '../core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-disclosure': AriaDisclosureElement
    'q-aria-disclosure-button': AriaDisclosureButtonElement
    'q-aria-disclosure-panel': AriaDisclosurePanelElement
    'q-aria-disclosure-section': AriaDisclosureSectionElement
  }
}

@CustomElement('q-aria-disclosure')
export class AriaDisclosureElement extends BaseElement {
  @QueryAll('q-aria-disclosure-button')
  buttonElements!: AriaDisclosureButtonElement[]

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

  get focusedButtonElement(): AriaDisclosureButtonElement | undefined {
    return this.buttonElements.find((button: AriaDisclosureButtonElement) => button === document.activeElement)
  }

  get name(): ElementName {
    return ElementName.DISCLOSURE
  }
}

@CustomElement('q-aria-disclosure-section')
export class AriaDisclosureSectionElement extends BaseElement {
  protected aria: AriaDisclosureSectionController = new AriaDisclosureSectionController(this)

  @Query('q-aria-disclosure-button')
  buttonElement!: AriaDisclosureButtonElement

  @Property({ type: Boolean, reflect: true })
  expanded?: boolean

  @Query('q-aria-disclosure-panel')
  panelElement?: AriaDisclosurePanelElement

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

@CustomElement('q-aria-disclosure-button')
export class AriaDisclosureButtonElement extends BaseElement {
  protected aria: AriaDisclosureButtonController = new AriaDisclosureButtonController(this)

  @Closest('q-aria-disclosure-section')
  sectionElement!: AriaDisclosureSectionElement

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

@CustomElement('q-aria-disclosure-panel')
export class AriaDisclosurePanelElement extends BaseElement {
  protected aria: AriaDisclosurePanelController = new AriaDisclosurePanelController(this)

  get name(): ElementName {
    return ElementName.DISCLOSURE_PANEL
  }
}
