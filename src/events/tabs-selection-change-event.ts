import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail<T extends HTMLElement> {
  selectedTab?: T
  selectedTabIndex: number
}

export class TabsSelectionChangeEvent<T extends HTMLElement> extends IsomorphicEvent<Detail<T>> {
  constructor(selectedTab: T | undefined, selectedTabIndex: number) {
    super('selection-change', { detail: { selectedTab, selectedTabIndex } })
  }
}
