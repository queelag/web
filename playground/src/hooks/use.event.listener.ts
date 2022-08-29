import type { RefObject } from 'preact'
import { useEffect } from 'preact/hooks'

export function useEventListener<T extends Element, K extends keyof ElementEventMap>(
  ref: RefObject<T | null>,
  type: K,
  listener: (event: ElementEventMap[K]) => void
) {
  useEffect(() => {
    ref.current?.addEventListener(type, listener)
    return () => ref.current?.removeEventListener(type, listener)
  }, [])
}
