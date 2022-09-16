import { AriaTabsController, AriaTabsPanelController, AriaTabsTabController } from '@/controllers/aria.tabs.controller'
import { Closest } from '@/decorators/closest'
import { CustomElement } from '@/decorators/custom.element'
import { Property } from '@/decorators/property'
import { Query } from '@/decorators/query'
import { QueryAll } from '@/decorators/query.all'
import { ElementName, KeyboardEventKey } from '@/definitions/enums'
import { AttributeChangedEvent } from '@/events/attribute.changed.event'
import { ElementLogger } from '@/loggers/element.logger'
import { css } from 'lit'
import { BaseElement } from '../core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-tabs': AriaTabsElement
    'q-aria-tabs-panel': AriaTabsPanelElement
    'q-aria-tabs-tab': AriaTabsTabElement
  }
}

@CustomElement('q-aria-tabs')
export class AriaTabsElement extends BaseElement {
  protected aria: AriaTabsController = new AriaTabsController(this)

  @Property({ type: Boolean, attribute: 'automatic-activation', reflect: true })
  automaticActivation?: boolean

  @Query('q-aria-tabs-panel')
  panelElement!: AriaTabsPanelElement

  @Query('q-aria-tabs-tab[selected]')
  selectedTabElement?: AriaTabsTabElement

  @QueryAll('q-aria-tabs-tab')
  tabElements!: AriaTabsTabElement[]

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
      case KeyboardEventKey.ARROW_LEFT:
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.END:
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.SPACE:
        event.preventDefault()
        event.stopPropagation()
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_LEFT:
        if (this.focusedTabElementIndex < 0) {
          break
        }

        if (this.focusedTabElementIndex === 0) {
          if (this.automaticActivation) {
            this.tabElements[this.tabElements.length - 1].select()
            ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The last tab has been selected.`)

            break
          }

          this.tabElements[this.tabElements.length - 1].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The last tab has been focused.`)

          break
        }

        if (this.automaticActivation) {
          this.tabElements[this.focusedTabElementIndex - 1].select()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The previous tab has been selected.`)

          break
        }

        this.tabElements[this.focusedTabElementIndex - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The previous tab has been focused.`)

        break
      case KeyboardEventKey.ARROW_RIGHT:
        if (this.focusedTabElementIndex < 0) {
          break
        }

        if (this.focusedTabElementIndex >= this.tabElements.length - 1) {
          if (this.automaticActivation) {
            this.tabElements[0].select()
            ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The first tab has been selected.`)

            break
          }

          this.tabElements[0].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The first tab has been focused.`)

          break
        }

        if (this.automaticActivation) {
          this.tabElements[this.focusedTabElementIndex + 1].select()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The next tab has been selected.`)

          break
        }

        this.tabElements[this.focusedTabElementIndex + 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The next tab has been focused.`)

        break
      case KeyboardEventKey.END:
        if (this.automaticActivation) {
          this.tabElements[0].select()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The first tab has been selected.`)

          break
        }

        this.tabElements[0].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The first tab has been focused.`)

        break
      case KeyboardEventKey.HOME:
        if (this.automaticActivation) {
          this.tabElements[this.tabElements.length - 1].select()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The last tab has been selected.`)

          break
        }

        this.tabElements[this.tabElements.length - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The last tab has been focused.`)

        break
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        if (this.automaticActivation) {
          break
        }

        this.focusedTabElement?.select()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ENTER or SPACE', `The focused tab has been selected.`)

        break
    }
  }

  get focusedTabElement(): AriaTabsTabElement | undefined {
    return this.tabElements.find((tab: AriaTabsTabElement) => tab === document.activeElement)
  }

  get focusedTabElementIndex(): number {
    return this.tabElements.indexOf(document.activeElement as AriaTabsTabElement)
  }

  get manualActivation(): boolean {
    return !this.automaticActivation
  }

  get name(): ElementName {
    return ElementName.TABS
  }

  get selectedTabElementIndex(): number {
    return this.selectedTabElement ? this.tabElements.indexOf(this.selectedTabElement) : -1
  }
}

@CustomElement('q-aria-tabs-tab')
export class AriaTabsTabElement extends BaseElement {
  protected aria: AriaTabsTabController = new AriaTabsTabController(this)

  @Closest('q-aria-tabs')
  rootElement!: AriaTabsElement

  @Property({ type: Boolean, reflect: true })
  selected?: boolean

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.onClick)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name !== 'selected' || Object.is(_old, value)) {
      return
    }

    this.rootElement.dispatchEvent(new AttributeChangedEvent('selected', _old, value))
  }

  onClick = (): void => {
    this.select()
    ElementLogger.verbose(this.uid, 'onClick', `The tab has been selected.`)
  }

  select(): void {
    this.rootElement.selectedTabElement?.unselect()

    this.selected = true
    this.focus()
  }

  unselect(): void {
    this.selected = false
  }

  get name(): ElementName {
    return ElementName.TABS_TAB
  }

  static styles = [
    super.styles,
    css`
      :host {
        cursor: pointer;
      }
    `
  ]
}

@CustomElement('q-aria-tabs-panel')
export class AriaTabsPanelElement extends BaseElement {
  protected aria: AriaTabsPanelController = new AriaTabsPanelController(this)

  get name(): ElementName {
    return ElementName.TABS_PANEL
  }
}
