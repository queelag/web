import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail<T extends HTMLElement> {
  selectedTab?: T
  selectedTabIndex: number
}

/**
 * @category Event
 */
export class TabsTabSelectionEvent<T extends HTMLElement> extends IsomorphicEvent<Detail<T>> {
  constructor(selectedTab: T | undefined, selectedTabIndex: number) {
    super('tabs-tab-selection', { detail: { selectedTab, selectedTabIndex } })
  }
}
