import { StubCustomEvent } from '../definitions/stubs'

if (typeof CustomEvent !== 'function') {
  global.CustomEvent = StubCustomEvent
}

export class IsomorphicEvent<T> extends CustomEvent<T> {}
