import { debounce } from '@queelag/core'
import { DEFAULT_TYPEAHEAD_DEBOUNCE_TIME } from '../definitions/constants'
import { ElementLogger } from '../loggers/element.logger'

export function typeahead<T extends HTMLElement>(
  debounceTime = DEFAULT_TYPEAHEAD_DEBOUNCE_TIME,
  elements: T[],
  event: KeyboardEvent,
  getValue: () => string,
  setFocus: (element: T) => any,
  setValue: (value: string) => any,
  uid: string
): void {
  let match: T | undefined

  if (event.key.length > 1) {
    return
  }

  setValue(getValue() + event.key)
  ElementLogger.verbose('typeahead', uid, `The typeahead value has been updated.`, [event.key, getValue()])

  match = elements.find((element: T) => element.innerText.toLowerCase().trim().startsWith(getValue().charAt(0).toLowerCase().trim()))
  if (match) {
    setFocus(match)
    ElementLogger.verbose('typeahead', uid, `The matched option has been focused.`)
  }

  debounce(
    uid,
    () => {
      let match: T | undefined

      match = elements.find((element: T) => element.innerText.toLowerCase().trim().startsWith(getValue().toLowerCase().trim()))
      if (match) {
        setFocus(match)
        ElementLogger.verbose('typeahead', uid, `The matched option has been focused.`)
      }

      setValue('')
      ElementLogger.verbose('typeahead', uid, `The typeahead value has been reset.`)
    },
    debounceTime
  )
}
