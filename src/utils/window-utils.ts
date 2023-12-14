import { Environment } from '@aracna/core'
import { StubDOMRect } from '../definitions/stubs.js'

export function getWindowBoundingClientRect(): DOMRect {
  if (Environment.isWindowNotDefined) {
    return new StubDOMRect(0, 0, 0, 0)
  }

  return new DOMRect(0, 0, window.innerWidth, window.innerHeight)
}
