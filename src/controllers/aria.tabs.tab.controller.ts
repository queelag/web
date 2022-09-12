import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import type { TabsTabElement } from '../elements/tabs.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaTabsTabController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & TabsTabElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-selected', this.host.selected ? 'true' : undefined)
    setImmutableElementAttribute(this.host, 'aria-controls', this.host.selected ? this.host.rootElement.panelElement.id : undefined)
    setImmutableElementAttribute(this.host, 'role', 'tab')
    setImmutableElementAttribute(this.host, 'tabindex', this.host.selected ? '0' : '-1')

    if (this.host.selected) {
      setImmutableElementAttribute(this.host.rootElement.panelElement, 'aria-labelledby', this.host.id)
    }

    if (this.host.id.length <= 0) {
      setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.TABS_TAB }))
    }
  }
}
