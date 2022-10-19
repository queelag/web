import { debounce, ID } from '@queelag/core'
import { DEFAULT_TYPEAHEAD_DEBOUNCE_TIME } from '../definitions/constants'
import { TypeaheadOptions } from '../definitions/interfaces'
import { TypeaheadOnMatch, TypeaheadPredicate } from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'

export class Typeahead<T> {
  private debounceID: string
  debounceTime: number
  value: string

  constructor(onMatch: TypeaheadOnMatch<T>, debounceTime: number = DEFAULT_TYPEAHEAD_DEBOUNCE_TIME) {
    this.debounceID = ID.generate()
    this.debounceTime = debounceTime
    this.value = ''

    this.onMatch = onMatch
  }

  onMatch(item: T): any {}

  handle(event: KeyboardEvent, items: T[], predicate: TypeaheadPredicate<T>, options?: TypeaheadOptions<T>): void {
    let match: T | undefined

    if (event.key.length > 1) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.value += event.key
    ElementLogger.verbose('Typeahead', 'handle', `The typeahead value has been updated.`, [event.key, this.value])

    match = items.find((item: T, index: number, items: T[]) => predicate(item, this.value, index, items))
    if (match) this.onMatch(match)

    debounce(this.debounceID, () => this.debouncefn(items, predicate), options?.debounceTime ?? DEFAULT_TYPEAHEAD_DEBOUNCE_TIME)
  }

  private debouncefn(items: T[], predicate: TypeaheadPredicate<T>): void {
    let match: T | undefined

    match = items.find((item: T, index: number, items: T[]) => predicate(item, this.value, index, items))
    if (match) this.onMatch(match)

    this.value = ''
    ElementLogger.verbose('Typeahead', 'handle', `The typeahead value has been reset.`)
  }
}
