import { StubEvent } from '../definitions/stubs'

if (typeof Event !== 'function') {
  global.Event = StubEvent as typeof Event
}

interface IsomorphicEventInit<T = any> extends EventInit {
  detail?: T
}

export class IsomorphicEvent<T = any> extends Event {
  readonly detail?: T

  constructor(type: string, eventInitDict?: IsomorphicEventInit<T>) {
    super(type, eventInitDict)

    this.detail = eventInitDict?.detail
  }
}
