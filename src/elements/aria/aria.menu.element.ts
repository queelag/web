import { css } from 'lit'
import { AriaMenuButtonController, AriaMenuController, AriaMenuItemController, AriaMenuListController } from '../../controllers/aria.menu.controller'
import { Closest } from '../../decorators/closest'
import { CustomElement } from '../../decorators/custom.element'
import { Internal } from '../../decorators/internal'
import { Property } from '../../decorators/property'
import { Query } from '../../decorators/query'
import { QueryAll } from '../../decorators/query.all'
import { ElementName, KeyboardEventKey } from '../../definitions/enums'
import { ElementLogger } from '../../loggers/element.logger'
import { Typeahead } from '../../modules/typeahead'
import { scrollElementIntoView } from '../../utils/element.utils'
import { BaseElement } from '../core/base.element'
import { FloatingElement } from '../core/floating.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-menu': AriaMenuElement
    'q-aria-menu-button': AriaMenuButtonElement
    'q-aria-menu-item': AriaMenuItemElement
    'q-aria-menu-list': AriaMenuListElement
  }
}

@CustomElement('q-aria-menu')
export class AriaMenuElement extends BaseElement {
  protected aria: AriaMenuController = new AriaMenuController(this)

  @Query('q-aria-menu-button')
  buttonElement!: AriaMenuButtonElement

  @Property({ type: Boolean, reflect: true })
  expanded?: boolean

  @Query('q-aria-menu-item[focused]')
  focusedItemElement?: AriaMenuItemElement

  @QueryAll('q-aria-menu-item')
  itemElements!: AriaMenuItemElement[]

  @Query('q-aria-menu-list')
  listElement?: AriaMenuListElement

  // @Property({ type: Boolean, reflect: true })
  // navigation?: boolean

  @Internal()
  typeahead: Typeahead<AriaMenuItemElement> = new Typeahead((element: AriaMenuItemElement) => {
    this.focusedItemElement?.blur()

    element.focus()
    ElementLogger.verbose(this.uid, 'onMatch', `The matched item has been focused.`)
  })

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('focusout', this.onFocusOut)
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('focusout', this.onFocusOut)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)
    this.listElement?.computePosition && this.listElement?.computePosition()
  }

  onFocusOut = (): void => {
    this.listElement?.scrollTo(0, 0)

    this.expanded = false
    ElementLogger.verbose(this.uid, 'onFocusOut', `The menu has been collapsed.`)
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
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.END:
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.SPACE:
        this.focusedItemElement?.blur()
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        if (this.collapsed) {
          this.expanded = true
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN or ENTER or SPACE', `The menu has been expanded.`)

          this.itemElements[0].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN or ENTER or SPACE', `The first item has been focused.`)

          break
        }

        if (event.key === KeyboardEventKey.ARROW_DOWN) {
          if (this.focusedItemElementIndex >= this.itemElements.length - 1) {
            this.itemElements[0].focus()
            ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The first item has been focused.`)

            break
          }

          this.itemElements[this.focusedItemElementIndex + 1].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The next item has been focused.`)

          break
        }

        this.focusedItemElement?.click()

        break
      case KeyboardEventKey.ARROW_UP:
        if (this.collapsed) {
          this.expanded = true
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The menu has been expanded.`)

          this.itemElements[this.itemElements.length - 1].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The last item has been focused.`)

          break
        }

        if (this.focusedItemElementIndex <= 0) {
          this.itemElements[this.itemElements.length - 1].focus()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The last item has been focused.`)

          break
        }

        this.itemElements[this.focusedItemElementIndex - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The previous item has been focused.`)

        break
      case KeyboardEventKey.END:
        if (this.collapsed) {
          return
        }

        this.itemElements[this.itemElements.length - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'END', `The last item has been focused.`)

        break
      case KeyboardEventKey.ESCAPE:
        this.listElement?.scrollTo(0, 0)

        this.expanded = false
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ESCAPE', `The menu has been collapsed.`)

        this.buttonElement.focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ESCAPE', `The button has been focused.`)

        break
      case KeyboardEventKey.HOME:
        if (this.collapsed) {
          return
        }

        this.itemElements[0].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The first item has been focused.`)

        break
      default:
        if (this.collapsed) {
          return
        }

        this.typeahead.handle(event, this.itemElements)
        break
    }
  }

  get collapsed(): boolean {
    return !this.expanded
  }

  get focusedItemElementIndex(): number {
    return this.focusedItemElement ? this.itemElements.indexOf(this.focusedItemElement) : -1
  }

  get name(): ElementName {
    return ElementName.MENU
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

@CustomElement('q-aria-menu-button')
export class AriaMenuButtonElement extends BaseElement {
  protected arai: AriaMenuButtonController = new AriaMenuButtonController(this)

  @Closest('q-aria-menu')
  rootElement!: AriaMenuElement

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.onClick)
  }

  onClick = (): void => {
    this.rootElement.focusedItemElement?.blur()

    this.rootElement.expanded = !this.rootElement.expanded
    ElementLogger.verbose(this.uid, 'onClick', `The menu has been ${this.rootElement.expanded ? 'expanded' : 'collapsed'}.`)

    if (this.rootElement.expanded) {
      this.rootElement.itemElements[0].focus()
      ElementLogger.verbose(this.uid, 'onClick', `The first item has been focused.`)
    }
  }

  get name(): ElementName {
    return ElementName.MENU_BUTTON
  }
}

@CustomElement('q-aria-menu-list')
export class AriaMenuListElement extends FloatingElement {
  protected aria: AriaMenuListController = new AriaMenuListController(this)

  @Query('q-aria-menu-item[focused]')
  focusedItemElement?: AriaMenuItemElement

  @Closest('q-aria-menu')
  rootElement!: AriaMenuElement

  get name(): ElementName {
    return ElementName.MENU_ITEM
  }

  get referenceElement(): HTMLElement {
    return this.rootElement.buttonElement
  }

  static styles = [
    super.styles,
    css`
      :host {
        left: 0;
        overflow-y: auto;
        position: absolute;
        right: 0;
        z-index: 2;
      }
    `
  ]
}

@CustomElement('q-aria-menu-item')
export class AriaMenuItemElement extends BaseElement {
  protected aria: AriaMenuItemController = new AriaMenuItemController(this)

  @Property({ type: Boolean, reflect: true })
  focused?: boolean

  @Query('a')
  anchorElement?: HTMLAnchorElement

  @Closest('q-aria-menu-list')
  listElement!: AriaMenuListElement

  @Closest('q-aria-menu')
  rootElement!: AriaMenuElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.onClick)
    this.addEventListener('mousedown', this.onMouseDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.onClick)
    this.removeEventListener('mousedown', this.onMouseDown)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name === 'focused') {
      scrollElementIntoView(this.listElement, this)
      ElementLogger.verbose(this.uid, ' attributeChangedCallback', `The item has been scrolled into view.`)
    }
  }

  onClick = (): void => {
    this.rootElement.expanded = false
    ElementLogger.verbose(this.uid, 'onClick', `The menu has been collapsed.`)

    this.anchorElement?.click()
  }

  onMouseDown = (event: MouseEvent): void => {
    event.preventDefault()
  }

  focus(): void {
    this.focused = true
    // this.anchorElement?.focus()
  }

  blur(): void {
    this.focused = false
    // this.anchorElement?.blur()
  }

  get name(): ElementName {
    return ElementName.MENU_ITEM
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
