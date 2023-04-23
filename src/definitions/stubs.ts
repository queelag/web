import { STUB_COOKIE_GET, STUB_COOKIE_SET, STUB_STORAGE } from '@aracna/core'

export class StubEvent implements Event {
  readonly bubbles: boolean
  cancelBubble: boolean
  readonly cancelable: boolean
  readonly composed: boolean
  readonly currentTarget: EventTarget | null
  readonly defaultPrevented: boolean
  readonly eventPhase: number
  readonly isTrusted: boolean
  /** @deprecated */
  returnValue: boolean
  /** @deprecated */
  readonly srcElement: EventTarget | null
  readonly target: EventTarget | null
  readonly timeStamp: DOMHighResTimeStamp
  readonly type: string

  constructor(type: string, eventInitDict?: EventInit) {
    this.AT_TARGET = 2
    this.BUBBLING_PHASE = 3
    this.CAPTURING_PHASE = 1
    this.NONE = 0

    this.bubbles = eventInitDict?.bubbles ?? false
    this.cancelable = eventInitDict?.cancelable ?? false
    this.cancelBubble = false
    this.composed = eventInitDict?.composed ?? false
    this.currentTarget = null
    this.defaultPrevented = false
    this.eventPhase = this.NONE
    this.isTrusted = false
    this.returnValue = false
    this.srcElement = null
    this.target = null
    this.timeStamp = 0
    this.type = type
  }

  composedPath(): EventTarget[] {
    return []
  }

  /** @deprecated */
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void {}
  preventDefault(): void {}
  stopImmediatePropagation(): void {}
  stopPropagation(): void {}

  readonly AT_TARGET: 2
  readonly BUBBLING_PHASE: 3
  readonly CAPTURING_PHASE: 1
  readonly NONE: 0
}

export const STUB_DOCUMENT_COOKIE_MAP: Map<string, string> = new Map()
export const STUB_DOCUMENT_COOKIE_ATTRIBUTES: PropertyDescriptor = {
  get: STUB_COOKIE_GET(STUB_DOCUMENT_COOKIE_MAP),
  set: STUB_COOKIE_SET(STUB_DOCUMENT_COOKIE_MAP)
}

export const STUB_LOCAL_STORAGE_MAP: Map<string, string> = new Map()
export const STUB_LOCAL_STORAGE: Storage = STUB_STORAGE(STUB_LOCAL_STORAGE_MAP)

export const STUB_SESSION_STORAGE_MAP: Map<string, string> = new Map()
export const STUB_SESSION_STORAGE: Storage = STUB_STORAGE(STUB_SESSION_STORAGE_MAP)
