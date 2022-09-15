import { css } from 'lit'
import { AriaMenuBarController, AriaMenuBarItemController, AriaMenuBarSubMenuController } from '../../controllers/aria.menu.bar.controller'
import { Closest } from '../../decorators/closest'
import { CustomElement } from '../../decorators/custom.element'
import { Property } from '../../decorators/property'
import { Query } from '../../decorators/query'
import { QueryAll } from '../../decorators/query.all'
import { ElementName } from '../../definitions/enums'
import { ElementLogger } from '../../loggers/element.logger'
import { BaseElement } from '../core/base.element'
import { FloatingElement } from '../core/floating.element'

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

  @QueryAll('q-aria-menubar-item')
  itemElements!: AriaMenuBarItemElement[]

  get isEveryItemElementWithNegativeTabIndex(): boolean {
    return this.itemElements.every((item: AriaMenuBarItemElement) => item.tabIndex < 0)
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
  expanded?: boolean

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
    this.expanded = true
    ElementLogger.verbose(this.uid, 'onMouseEnter', `The item has been expanded.`)
  }

  onMouseLeave = (): void => {
    this.expanded = false
    ElementLogger.verbose(this.uid, 'onMouseLeave', `The item has been collapsed.`)
  }

  get deep(): boolean {
    return this.closest('q-aria-menubar-submenu') !== null
  }

  get index(): number {
    return this.rootElement.itemElements.indexOf(this)
  }

  get shallow(): boolean {
    return this.closest('q-aria-menubar-submenu') === null
  }

  get focused(): boolean {
    return this === document.activeElement
  }

  get name(): ElementName {
    return ElementName.MENUBAR_ITEM
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

  @Closest('q-aria-menubar-item')
  itemElement!: AriaMenuBarItemElement

  @Closest('q-aria-menubar-submenu')
  subMenuElement?: AriaMenuBarSubMenuElement

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
