import { AriaMenuBarController, AriaMenuBarItemController, AriaMenuBarSubMenuController } from '@/controllers/aria.menu.bar.controller'
import { Closest } from '@/decorators/closest'
import { CustomElement } from '@/decorators/custom.element'
import { Internal } from '@/decorators/internal'
import { Property } from '@/decorators/property'
import { Query } from '@/decorators/query'
import { QueryAll } from '@/decorators/query.all'
import { ElementName, KeyboardEventKey } from '@/definitions/enums'
import { ElementLogger } from '@/loggers/element.logger'
import { Typeahead } from '@/modules/typeahead'
import { setImmutableElementAttribute } from '@/utils/element.utils'
import { debounce } from '@queelag/core'
import { css } from 'lit'
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

  @Internal()
  private expanded?: boolean

  @Internal()
  private focused?: boolean = true

  @Query('q-aria-menubar-submenu[expanded]')
  expandedSubMenuElement?: AriaMenuBarSubMenuElement

  @QueryAll('q-aria-menubar-submenu[expanded]')
  expandedSubMenuElements!: AriaMenuBarSubMenuElement[]

  @Query('q-aria-menubar-item[focused]')
  focusedItemElement?: AriaMenuBarItemElement

  @QueryAll('q-aria-menubar-item[focused]')
  focusedItemElements!: AriaMenuBarItemElement[]

  @QueryAll('q-aria-menubar-item')
  itemElements!: AriaMenuBarItemElement[]

  @Query('q-aria-menubar-item[depth="0"][focused]')
  shallowFocusedItemElement?: AriaMenuBarItemElement

  @QueryAll('q-aria-menubar-item[depth="0"]')
  shallowItemElements!: AriaMenuBarItemElement[]

  @Internal()
  typeahead: Typeahead<AriaMenuBarItemElement> = new Typeahead((item: AriaMenuBarItemElement) => {
    this.shallowFocusedItemElement?.blur()

    item.focus()
    ElementLogger.verbose(this.uid, 'onMatch', `The matched item has been focused.`)
  })

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('focusin', this.onFocusIn)
    this.addEventListener('focusout', this.onFocusOut)
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('focusin', this.onFocusIn)
    this.removeEventListener('focusout', this.onFocusOut)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onFocusIn = (): void => {
    this.focused = true
  }

  onFocusOut = (): void => {
    this.focused = false
    debounce(this.uid, this.onFocusOutDebounce, 200)
  }

  onFocusOutDebounce = (): void => {
    if (this.focused) {
      return
    }

    for (let submenu of this.expandedSubMenuElements) {
      submenu.collapse()
    }

    setImmutableElementAttribute(this.shallowItemElements[0].anchorElement || this.shallowItemElements[0], 'tabindex', '0')
  }

  onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case KeyboardEventKey.ENTER:
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
        this.blurFocusedItemElements()

        if (this.shallowFocusedItemElementIndex <= 0) {
          this.shallowItemElements[this.shallowItemElements.length - 1].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The last item has been focused.`)

          if (this.expanded) {
            this.expandedSubMenuElement?.collapse()
            this.shallowItemElements[this.shallowItemElements.length - 1].subMenuElement?.expand()
          }

          break
        }

        this.shallowItemElements[this.shallowFocusedItemElementIndex - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The previous item has been focused.`)

        if (this.expanded) {
          this.expandedSubMenuElement?.collapse()
          this.shallowItemElements[this.shallowFocusedItemElementIndex - 1].subMenuElement?.expand()
        }

        break
      case KeyboardEventKey.ARROW_RIGHT:
        this.blurFocusedItemElements()

        if (this.shallowFocusedItemElementIndex >= this.shallowItemElements.length - 1) {
          this.shallowItemElements[0].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The first item has been focused.`)

          if (this.expanded) {
            this.expandedSubMenuElement?.collapse()
            this.shallowItemElements[0].subMenuElement?.expand()
          }

          break
        }

        this.shallowItemElements[this.shallowFocusedItemElementIndex + 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The next item has been focused.`)

        if (this.expanded) {
          this.expandedSubMenuElement?.collapse()
          this.shallowItemElements[this.shallowFocusedItemElementIndex + 1].subMenuElement?.expand()
        }

        break
      case KeyboardEventKey.ARROW_DOWN:
        if (!this.shallowFocusedItemElement?.subMenuElement) {
          break
        }

        if (this.collapsed) {
          this.shallowFocusedItemElement.subMenuElement.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The submenu has been expanded.`)

          this.shallowFocusedItemElement.subMenuElement.shallowItemElements[0].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The first item of the submenu has been focused.`)

          this.expanded = true

          break
        }

        this.shallowFocusedItemElement.subMenuElement.shallowItemElements[0].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The first item of the submenu has been focused.`)

        break
      case KeyboardEventKey.ARROW_UP:
        if (!this.shallowFocusedItemElement?.subMenuElement) {
          break
        }

        if (this.collapsed) {
          this.shallowFocusedItemElement.subMenuElement.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The submenu has been expanded.`)

          this.shallowFocusedItemElement.subMenuElement.shallowItemElements[
            this.shallowFocusedItemElement.subMenuElement.shallowItemElements.length - 1
          ].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The last item of the submenu has been focused.`)

          this.expanded = true

          break
        }

        this.shallowFocusedItemElement.subMenuElement.shallowItemElements[this.shallowFocusedItemElement.subMenuElement.shallowItemElements.length - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The last item of the submenu has been focused.`)

        break
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        if (this.shallowFocusedItemElement?.subMenuElement) {
          this.shallowFocusedItemElement.subMenuElement.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ENTER or SPACE', `The submenu has been expanded.`)

          this.expanded = true

          break
        }

        break
      case KeyboardEventKey.HOME:
        this.shallowFocusedItemElement?.blur()

        this.shallowItemElements[0].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The first item has been focused.`)

        break
      case KeyboardEventKey.END:
        this.shallowFocusedItemElement?.blur()

        this.shallowItemElements[this.shallowItemElements.length - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'END', `The last item has been focused.`)

        break
      default:
        this.typeahead.handle(event, this.shallowItemElements)
        break
    }
  }

  blurFocusedItemElements(): void {
    for (let item of this.focusedItemElements) {
      item.blur()
    }
  }

  get collapsed(): boolean {
    return !this.expanded
  }

  get name(): ElementName {
    return ElementName.MENUBAR
  }

  get shallowFocusedItemElementIndex(): number {
    return this.shallowFocusedItemElement ? this.shallowItemElements.indexOf(this.shallowFocusedItemElement) : -1
  }
}

@CustomElement('q-aria-menubar-item')
export class AriaMenuBarItemElement extends BaseElement {
  protected aria: AriaMenuBarItemController = new AriaMenuBarItemController(this)

  @Query('a')
  anchorElement?: HTMLAnchorElement

  @Property({ type: Boolean, reflect: true })
  focused?: boolean

  @Internal()
  mouseEntered?: boolean

  @Closest('q-aria-menubar')
  rootElement!: AriaMenuBarElement

  @Query('q-aria-menubar-submenu')
  subMenuElement?: AriaMenuBarSubMenuElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.onClick)
    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseleave', this.onMouseLeave)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.onClick)
    this.removeEventListener('mouseenter', this.onMouseEnter)
    this.removeEventListener('mouseleave', this.onMouseLeave)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name === 'expanded') {
      this.subMenuElement?.computePosition && this.subMenuElement.computePosition()
    }
  }

  onClick = (event: MouseEvent): void => {
    event.stopPropagation()

    if (this.depth > 0) {
      return
    }

    if (this.subMenuElement) {
      event.preventDefault()

      this.subMenuElement?.expand()
      ElementLogger.verbose(this.uid, 'onClick', `The submenu has been expanded.`)
    }
  }

  onMouseEnter = (): void => {
    this.mouseEntered = true
    ElementLogger.verbose(this.uid, 'onMouseEnter', `The mouse has entered.`)

    this.sameDepthFocusedItemElement?.blur()
    ElementLogger.verbose(this.uid, 'onMouseEnter', `The same depth focused item has been blurred.`)

    if (this.sameDepthExpandedSubMenuElement) {
      this.sameDepthExpandedSubMenuElement.collapse()
      ElementLogger.verbose(this.uid, 'onMouseEnter', `The same depth expanded submenu has been collapsed.`)
    }

    if (this.subMenuElement) {
      this.subMenuElement.expand()
      ElementLogger.verbose(this.uid, 'onMouseEnter', `The submenu has been expanded.`)
    }

    this.focus()
    ElementLogger.verbose(this.uid, 'onMouseEnter', `The item has been focused.`)
  }

  onMouseLeave = (): void => {
    this.mouseEntered = false
    ElementLogger.verbose(this.uid, 'onMouseLeave', `The mouse has left.`)

    debounce(this.uid, this.onMouseLeaveDebounce, 200)
  }

  onMouseLeaveDebounce = (): void => {
    if (this.mouseEntered) {
      return
    }

    if (this.subMenuElement) {
      this.subMenuElement?.collapse()
      ElementLogger.verbose(this.uid, 'onMouseLeave', `The submenu has been collapsed.`)
    }

    if (this.depth > 0) {
      this.blur()
      ElementLogger.verbose(this.uid, ' onMouseLeave', `The item has been blurred.`)
    }
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
    return [...this.rootElement.itemElements].indexOf(this)
  }

  get name(): ElementName {
    return ElementName.MENUBAR_ITEM
  }

  get sameDepthItemElements(): NodeListOf<AriaMenuBarItemElement> {
    return this.rootElement.querySelectorAll(`q-aria-menubar-item[depth="${this.depth}"][focused]`)
  }

  get sameDepthFocusedItemElement(): AriaMenuItemElement | null {
    return this.rootElement.querySelector(`q-aria-menubar-item[depth="${this.depth}"][focused]`)
  }

  get sameDepthFocusedItemElements(): NodeListOf<AriaMenuBarItemElement> {
    return this.rootElement.querySelectorAll(`q-aria-menubar-item[depth="${this.depth}"][focused]`)
  }

  get sameDepthExpandedSubMenuElement(): AriaMenuBarSubMenuElement | null {
    return this.rootElement.querySelector(`q-aria-menubar-submenu[depth="${this.subMenuElement?.depth}"][expanded]`)
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

  @Internal()
  typeahead: Typeahead<AriaMenuBarItemElement> = new Typeahead((item: AriaMenuBarItemElement) => {
    this.shallowFocusedItemElement?.blur()

    item.focus()
    ElementLogger.verbose(this.uid, 'onMatch', `The matched item has been focused.`)
  })

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
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.END:
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.ESCAPE:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.SPACE:
        event.preventDefault()
        event.stopPropagation()
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_DOWN:
        this.shallowFocusedItemElement?.blur()

        if (this.shallowFocusedItemElementIndex >= this.shallowItemElements.length - 1) {
          this.shallowItemElements[0].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The first item has been focused.`)

          break
        }

        this.shallowItemElements[this.shallowFocusedItemElementIndex + 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The next item has been focused.`)

        break
      case KeyboardEventKey.ARROW_UP:
        this.shallowFocusedItemElement?.blur()

        if (this.shallowFocusedItemElementIndex <= 0) {
          this.shallowItemElements[this.shallowItemElements.length - 1].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The last item has been focused.`)

          break
        }

        this.shallowItemElements[this.shallowFocusedItemElementIndex - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_Up', `The previous item has been focused.`)

        break
      case KeyboardEventKey.ARROW_LEFT:
        if (this.depth <= 1) {
          break
        }

        if (this.expanded) {
          event.preventDefault()
          event.stopPropagation()

          this.shallowFocusedItemElement?.blur()

          this.collapse()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The submenu has been collapsed.`)

          this.itemElement.focus()
        }

        break
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        if (this.depth <= 0) {
          break
        }

        if (this.shallowFocusedItemElement?.subMenuElement && this.shallowFocusedItemElement.subMenuElement.collapsed) {
          event.preventDefault()
          event.stopPropagation()

          this.shallowFocusedItemElement.subMenuElement.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT or ENTER or SPACE', `The focused item submenu has been expanded.`)

          this.shallowFocusedItemElement.subMenuElement.shallowItemElements[0].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT or ENTER or SPACE', `The first item of the focused item submenu has been expanded.`)
        }

        break
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        this.shallowFocusedItemElement?.anchorElement?.click()
        ElementLogger.verbose(this.uid, 'onClick', 'ENTER or SPACE', `The focused item has been clicked.`)

        break
      case KeyboardEventKey.END:
        this.shallowFocusedItemElement?.blur()

        this.shallowItemElements[this.shallowItemElements.length - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'END', `The last item has been focused.`)

        break
      case KeyboardEventKey.HOME:
        this.shallowFocusedItemElement?.blur()

        this.shallowItemElements[0].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The first item has been focused.`)

        break
      case KeyboardEventKey.ESCAPE:
        this.shallowFocusedItemElement?.blur()

        this.collapse()
        this.itemElement.focus()

        break
      default:
        this.typeahead.handle(event, [...this.shallowItemElements])
        break
    }
  }

  collapse(): void {
    this.expanded = false
  }

  expand(): void {
    this.expanded = true
  }

  get collapsed(): boolean {
    return !this.expanded
  }

  get depth(): number {
    let n: number, closest: AriaMenuBarItemElement | null | undefined

    n = 0
    closest = this.closest('q-aria-menubar-item')

    while (typeof closest === 'object' && closest !== null) {
      n++
      closest = closest.parentElement?.closest('q-aria-menubar-item')
    }

    return n
  }

  get name(): ElementName {
    return ElementName.MENUBAR_SUBMENU
  }

  get referenceElement(): HTMLElement | undefined {
    return this === this.subMenuElement ? this.itemElement : this.subMenuElement
  }

  get shallowFocusedItemElement(): AriaMenuBarItemElement | null {
    return this.querySelector(`q-aria-menubar-item[depth="${this.depth}"][focused]`)
  }

  get shallowFocusedItemElementIndex(): number {
    return this.shallowFocusedItemElement ? [...this.shallowItemElements].indexOf(this.shallowFocusedItemElement) : -1
  }

  get shallowItemElements(): NodeListOf<AriaMenuBarItemElement> {
    return this.querySelectorAll(`q-aria-menubar-item[depth="${this.depth}"]`)
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
