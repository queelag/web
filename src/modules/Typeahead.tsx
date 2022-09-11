import { debounce, ID } from '@queelag/core'
import { DEFAULT_TYPEAHEAD_DEBOUNCE_TIME } from '../definitions/constants'
import { ElementLogger } from '../loggers/element.logger'

type OnMatch<T extends HTMLElement> = (element: T) => any

export class Typeahead<T extends HTMLElement> {
  private debounceID: string
  debounceTime: number
  value: string

  constructor(onMatch: OnMatch<T>, debounceTime: number = DEFAULT_TYPEAHEAD_DEBOUNCE_TIME) {
    this.debounceID = ID.generate()
    this.debounceTime = debounceTime
    this.value = ''

    this.onMatch = onMatch
  }

  onMatch(element: T): any {}

  handle(event: KeyboardEvent, elements: T[], debounceTime: number = this.debounceTime): void {
    let match: T | undefined

    if (event.key.length > 1) {
      return
    }

    this.value += event.key
    ElementLogger.verbose('Typeahead', 'handle', `The typeahead value has been updated.`, [event.key, this.value])

    match = elements.find((element: T) => element.innerText.toLowerCase().trim().startsWith(this.value.charAt(0).toLowerCase().trim()))
    if (match) this.onMatch(match)

    debounce(this.debounceID, () => this.debouncefn(elements), debounceTime)
  }

  private debouncefn(elements: T[]): void {
    let match: T | undefined

    match = elements.find((element: T) => element.innerText.toLowerCase().trim().startsWith(this.value.toLowerCase().trim()))
    if (match) this.onMatch(match)

    this.value = ''
    ElementLogger.verbose('Typeahead', 'handle', `The typeahead value has been reset.`)
  }
}
