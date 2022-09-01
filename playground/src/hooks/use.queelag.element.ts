import { createDocumentElement } from '@queelag/core'
import type { RefObject } from 'preact'
import { useEffect, useReducer, useRef } from 'preact/hooks'
import { useEventListener } from './use.event.listener'

interface ReturnInterface<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K]
  ref: RefObject<HTMLElementTagNameMap[K]>
}

export function useQueelagElement<K extends keyof HTMLElementTagNameMap>(tagName: K): ReturnInterface<K> {
  const ref = useRef(createDocumentElement(tagName))
  const [, dispatch] = useReducer(() => ({}), {})

  useEventListener(ref, 'attributechanged', () => dispatch({}), [ref.current])
  useEventListener(ref, 'statechanged', () => dispatch({}), [ref.current])
  useEffect(() => dispatch({}), [ref.current])

  return { element: ref.current, ref }
}
