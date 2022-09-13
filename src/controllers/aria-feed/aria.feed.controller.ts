import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { FeedElement } from '../../elements/feed.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaFeedController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & FeedElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-busy', this.host.busy ? 'true' : 'false')
    //   setImmutableElementAttribute(this.host, 'aria-labelledby', '')
    setImmutableElementAttribute(this.host, 'role', 'feed')
  }
}
