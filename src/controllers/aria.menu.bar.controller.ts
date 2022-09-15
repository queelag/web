import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { AriaMenuBarItemElement } from '../elements/aria/aria.menu.bar.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaMenuBarController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    //   setImmutableElementAttribute(this.host, 'aria-label', '')
    setImmutableElementAttribute(this.host, 'role', 'menubar')
  }
}

export class AriaMenuBarItemController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaMenuBarItemElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    //   setImmutableElementAttribute(this.host, 'aria-label', '')
    setImmutableElementAttribute(this.host.anchorElement || this.host, 'aria-expanded', this.host.expanded ? 'true' : 'false')
    setImmutableElementAttribute(this.host.anchorElement || this.host, 'aria-haspopup', 'true')
    setImmutableElementAttribute(this.host.anchorElement || this.host, 'role', 'menuitem')

    if (this.host.anchorElement) {
      setImmutableElementAttribute(this.host, 'role', 'none')

      if (this.host.shallow) {
        setImmutableElementAttribute(this.host.anchorElement, 'aria-current', this.host.anchorElement.href === window.location.href ? 'page' : undefined)
      }
    }

    if (this.host.index === 0 && this.host.rootElement.isEveryItemElementWithNegativeTabIndex) {
      setImmutableElementAttribute(this.host.anchorElement || this.host, 'tabindex', '0')
      return
    }

    setImmutableElementAttribute(this.host.anchorElement || this.host, 'tabindex', this.host.focused ? '0' : '-1')
  }
}

export class AriaMenuBarSubMenuController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    //   setImmutableElementAttribute(this.host, 'aria-label', '')
    setImmutableElementAttribute(this.host, 'role', 'menu')
  }
}
