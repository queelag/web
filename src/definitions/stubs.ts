import { STUB_COOKIE_GET, STUB_COOKIE_SET, STUB_STORAGE, isDocumentDefined } from '@aracna/core'

export class StubDOMRect implements DOMRect {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/bottom) */
  readonly bottom: number
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/height) */
  readonly height: number
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/left) */
  readonly left: number
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/right) */
  readonly right: number
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/top) */
  readonly top: number
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/width) */
  readonly width: number
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/x) */
  readonly x: number
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/y) */
  readonly y: number

  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.bottom = 0
    this.height = height ?? 0
    this.left = 0
    this.right = 0
    this.top = 0
    this.width = width ?? 0
    this.x = x ?? 0
    this.y = y ?? 0
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/fromRect) */
  fromRect(other?: DOMRectInit): DOMRectReadOnly {
    return new StubDOMRect(other?.x, other?.y, other?.width, other?.height)
  }

  toJSON(): any {
    return {
      bottom: this.bottom,
      height: this.height,
      left: this.left,
      right: this.right,
      top: this.top,
      width: this.width,
      x: this.x,
      y: this.y
    }
  }
}

export class StubEvent implements Event {
  readonly bubbles: boolean
  cancelBubble: boolean
  readonly cancelable: boolean
  readonly composed: boolean
  readonly currentTarget: EventTarget | null
  readonly defaultPrevented: boolean
  readonly eventPhase: number
  readonly isTrusted: boolean
  returnValue: boolean
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
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void {
    return
  }

  preventDefault(): void {
    return
  }

  stopImmediatePropagation(): void {
    return
  }

  stopPropagation(): void {
    return
  }

  readonly AT_TARGET: 2
  readonly BUBBLING_PHASE: 3
  readonly CAPTURING_PHASE: 1
  readonly NONE: 0
}

export class StubIntersectionObserver implements IntersectionObserver {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/root) */
  readonly root: Element | Document | null
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/rootMargin) */
  readonly rootMargin: string
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/thresholds) */
  readonly thresholds: ReadonlyArray<number>

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.root = options?.root ?? (isDocumentDefined() ? document : null)
    this.rootMargin = options?.rootMargin ?? '0px 0px 0px 0px'
    this.thresholds = typeof options?.threshold === 'number' ? [options.threshold] : options?.threshold ?? [0]
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/disconnect) */
  disconnect(): void {
    return
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/observe) */
  observe(target: Element): void {
    return
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords) */
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/unobserve) */
  unobserve(target: Element): void {
    return
  }
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
