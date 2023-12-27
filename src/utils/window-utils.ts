import { isWindowNotDefined } from '@aracna/core'
import { StubDOMRect } from '../definitions/stubs.js'

/**
 * Returns the bounding client rect of the window.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/window)
 */
export function getWindowBoundingClientRect(): DOMRect {
  if (isWindowNotDefined()) {
    return new StubDOMRect(0, 0, 0, 0)
  }

  return new DOMRect(0, 0, window.innerWidth, window.innerHeight)
}
