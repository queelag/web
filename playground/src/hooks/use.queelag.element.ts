import type { RefObject } from 'preact'
import { useEffect, useReducer, useRef } from 'preact/hooks'
import { useEventListener } from './use.event.listener'

interface ReturnInterface<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K] | null
  ref: RefObject<HTMLElementTagNameMap[K]>
}

export function useQueelagElement<K extends keyof HTMLElementTagNameMap>(tagName: K): ReturnInterface<K> {
  const ref = useRef(null)
  const [, dispatch] = useReducer(() => ({}), {})

  useEventListener(ref, 'attributechanged', () => dispatch({}), [ref.current])
  useEventListener(ref, 'statechanged', () => dispatch({}), [ref.current])
  useEffect(() => dispatch({}), [ref.current])

  return { element: ref.current, ref }
}
