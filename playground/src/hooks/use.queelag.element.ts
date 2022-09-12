import type { RefObject } from 'preact'
import { useEffect, useReducer, useRef } from 'preact/hooks'
import type { AttributeChangedEvent, StateChangedEvent } from '../../../src'
import { useEventListener } from './use.event.listener'

interface ReturnInterface<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K] | null
  ref: RefObject<HTMLElementTagNameMap[K]>
}

export function useQueelagElement<K extends keyof HTMLElementTagNameMap>(tagName: K): ReturnInterface<K> {
  const ref = useRef(null)
  const [, dispatch] = useReducer(() => ({}), {})

  const onAttributeChanged = (event: AttributeChangedEvent) => {
    dispatch({})
  }

  const onStateChanged = (event: StateChangedEvent<any>) => {
    dispatch({})
  }

  useEventListener(ref, 'attributechanged', onAttributeChanged, [ref.current])
  useEventListener(ref, 'statechanged', onStateChanged, [ref.current])
  useEffect(() => dispatch({}), [ref.current])

  return { element: ref.current, ref }
}
