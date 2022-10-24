import { STUB_COOKIE_GET, STUB_COOKIE_SET, STUB_STORAGE } from '@queelag/core'

export class StubCustomEvent<T> implements CustomEvent<T> {
  readonly bubbles: boolean
  cancelBubble: boolean
  readonly cancelable: boolean
  readonly composed: boolean
  readonly currentTarget: EventTarget | null
  readonly defaultPrevented: boolean
  readonly detail: T
  readonly eventPhase: number
  readonly isTrusted: boolean
  /** @deprecated */
  returnValue: boolean
  /** @deprecated */
  readonly srcElement: EventTarget | null
  readonly target: EventTarget | null
  readonly timeStamp: DOMHighResTimeStamp
  readonly type: string

  readonly AT_TARGET: number
  readonly BUBBLING_PHASE: number
  readonly CAPTURING_PHASE: number
  readonly NONE: number

  constructor(type: string, eventInitDict?: CustomEventInit<T>) {
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
    this.detail = eventInitDict?.detail as T
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

  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void {}
  initCustomEvent(type: string, bubbles?: boolean, cancelable?: boolean, detail?: T): void {}
  preventDefault(): void {}
  stopImmediatePropagation(): void {}
  stopPropagation(): void {}
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
