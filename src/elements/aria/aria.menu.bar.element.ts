import { css } from 'lit'
import { AriaMenuBarController, AriaMenuBarItemController, AriaMenuBarSubMenuController } from '../../controllers/aria.menu.bar.controller'
import { Closest } from '../../decorators/closest'
import { CustomElement } from '../../decorators/custom.element'
import { Internal } from '../../decorators/internal'
import { Property } from '../../decorators/property'
import { Query } from '../../decorators/query'
import { QueryAll } from '../../decorators/query.all'
import { ElementName, KeyboardEventKey } from '../../definitions/enums'
import { ElementLogger } from '../../loggers/element.logger'
import { BaseElement } from '../core/base.element'
import { FloatingElement } from '../core/floating.element'
import { AriaMenuItemElement } from './aria.menu.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-menubar': AriaMenuBarElement
    'q-aria-menubar-item': AriaMenuBarItemElement
    'q-aria-menubar-submenu': AriaMenuBarSubMenuElement
  }
}

@CustomElement('q-aria-menubar')
export class AriaMenuBarElement extends BaseElement {
  protected aria: AriaMenuBarController = new AriaMenuBarController(this)

  @Query('q-aria-menubar-item[depth="0"][focused]')
  depthZeroFocusedItemElement?: AriaMenuBarItemElement

  @QueryAll('q-aria-menubar-item[depth="0"]')
  depthZeroItemElements!: AriaMenuBarItemElement[]

  @Internal()
  expanded?: boolean

  @Query('q-aria-menubar-submenu[expanded]')
  expandedSubMenuElement?: AriaMenuBarSubMenuElement

  @QueryAll('q-aria-menubar-submenu[expanded] q-aria-menubar-item')
  expandedSubMenuItemElements!: AriaMenuItemElement[]

  @Query('q-aria-menubar-item[focused]')
  focusedItemElement?: AriaMenuBarItemElement

  @QueryAll('q-aria-menubar-item')
  itemElements!: AriaMenuBarItemElement[]

  @QueryAll('q-aria-menubar-submenu')
  subMenuElements!: AriaMenuBarSubMenuElement[]

  @Query('q-aria-menubar-item[tabindex="0"]')
  tabbableItemElement?: AriaMenuBarItemElement

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
      case KeyboardEventKey.ESCAPE:
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.ARROW_LEFT:
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.END:
      case KeyboardEventKey.SPACE:
        event.preventDefault()
        event.stopPropagation()
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_LEFT:
        this.focusedItemElement?.blur()

        this.depthZeroItemElements[this.depthZeroFocusedItemElementIndex - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The previous item has been focused.`)

        if (this.expanded) {
          this.expandedSubMenuElement?.collapse()
          this.depthZeroItemElements[this.depthZeroFocusedItemElementIndex - 1].subMenuElement?.expand()
        }

        break
      case KeyboardEventKey.ARROW_RIGHT:
        this.focusedItemElement?.blur()

        this.depthZeroItemElements[this.depthZeroFocusedItemElementIndex + 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The next item has been focused.`)

        if (this.expanded) {
          this.expandedSubMenuElement?.collapse()
          this.depthZeroItemElements[this.depthZeroFocusedItemElementIndex + 1].subMenuElement?.expand()
        }

        break
      case KeyboardEventKey.ARROW_DOWN:
        if (this.collapsed && this.focusedItemElement?.subMenuElement) {
          this.focusedItemElement.subMenuElement.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The submenu has been expanded.`)

          this.expanded = true

          break
        }

        break
      case KeyboardEventKey.ARROW_UP:
        break
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        if (this.focusedItemElement?.subMenuElement) {
          this.focusedItemElement.subMenuElement.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ENTER or SPACE', `The submenu has been expanded.`)

          this.expanded = true

          break
        }

        break
      case KeyboardEventKey.ESCAPE:
        if (this.focusedItemElement?.subMenuElement) {
          this.focusedItemElement.subMenuElement.collapse()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ESCAPE', `The submenu has been collapsed.`)

          this.expanded = false

          break
        }

        break
      case KeyboardEventKey.HOME:
        break
      case KeyboardEventKey.END:
        break
      default:
        break
    }
  }

  get collapsed(): boolean {
    return !this.expanded
  }

  get depthZeroFocusedItemElementIndex(): number {
    return this.depthZeroFocusedItemElement ? this.depthZeroItemElements.indexOf(this.depthZeroFocusedItemElement) : -1
  }

  get name(): ElementName {
    return ElementName.MENUBAR
  }
}

@CustomElement('q-aria-menubar-item')
export class AriaMenuBarItemElement extends BaseElement {
  protected aria: AriaMenuBarItemController = new AriaMenuBarItemController(this)

  @Query('a')
  anchorElement?: HTMLAnchorElement

  @Property({ type: Boolean, reflect: true })
  focused?: boolean

  @Closest('q-aria-menubar')
  rootElement!: AriaMenuBarElement

  @Query('q-aria-menubar-submenu')
  subMenuElement?: AriaMenuBarSubMenuElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseleave', this.onMouseLeave)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('mouseenter', this.onMouseEnter)
    this.removeEventListener('mouseleave', this.onMouseLeave)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name === 'expanded') {
      this.subMenuElement?.computePosition && this.subMenuElement.computePosition()
    }
  }

  onMouseEnter = (): void => {
    this.rootElement.focusedItemElement?.blur()

    this.subMenuElement?.expand()
    ElementLogger.verbose(this.uid, 'onMouseEnter', `The submenu has been expanded.`)

    this.focus()
  }

  onMouseLeave = (): void => {
    this.subMenuElement?.collapse()
    ElementLogger.verbose(this.uid, 'onMouseLeave', `The submenu has been collapsed.`)
  }

  blur(): void {
    this.focused = false

    if (this.anchorElement) {
      this.anchorElement.blur()
      return
    }

    super.blur()
  }

  focus(options?: FocusOptions | undefined): void {
    this.focused = true

    if (this.anchorElement) {
      this.anchorElement.focus()
      return
    }

    super.focus(options)
  }

  get deep(): boolean {
    return this.closest('q-aria-menubar-submenu') !== null
  }

  get depth(): number {
    let n: number, closest: AriaMenuBarSubMenuElement | null | undefined

    n = 0
    closest = this.closest('q-aria-menubar-submenu')

    while (typeof closest === 'object' && closest !== null) {
      n++
      closest = closest.parentElement?.closest('q-aria-menubar-submenu')
    }

    return n
  }

  get index(): number {
    return this.rootElement.itemElements.indexOf(this)
  }

  get name(): ElementName {
    return ElementName.MENUBAR_ITEM
  }

  get shallow(): boolean {
    return this.closest('q-aria-menubar-submenu') === null
  }

  static styles = [
    super.styles,
    css`
      :host {
        cursor: pointer;
        position: relative;
      }
    `
  ]
}

@CustomElement('q-aria-menubar-submenu')
export class AriaMenuBarSubMenuElement extends FloatingElement {
  protected aria: AriaMenuBarSubMenuController = new AriaMenuBarSubMenuController(this)

  @Property({ type: Boolean, reflect: true })
  expanded?: boolean

  @Closest('q-aria-menubar-item')
  itemElement!: AriaMenuBarItemElement

  @Closest('q-aria-menubar-submenu')
  subMenuElement?: AriaMenuBarSubMenuElement

  collapse(): void {
    this.expanded = false
  }

  expand(): void {
    this.expanded = true
  }

  get name(): ElementName {
    return ElementName.MENUBAR_SUBMENU
  }

  get referenceElement(): HTMLElement | undefined {
    return this === this.subMenuElement ? this.itemElement : this.subMenuElement
  }

  static styles = [
    super.styles,
    css`
      :host {
        left: 0;
        position: absolute;
        top: 0;
        z-index: 1;
      }
    `
  ]
}
