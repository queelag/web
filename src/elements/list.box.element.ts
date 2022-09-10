import { css } from 'lit'
import { AriaListBoxController } from '../controllers/aria.list.box.controller'
import { AriaListBoxOptionController } from '../controllers/aria.list.box.option.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Internal } from '../decorators/internal'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { State } from '../decorators/state'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { typeahead } from '../functions/typeahead'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-listbox': ListBoxElement
    'queelag-listbox-option': ListBoxOptionElement
  }
}

@CustomElement('queelag-listbox')
export class ListBoxElement extends BaseElement {
  protected aria: AriaListBoxController = new AriaListBoxController(this)

  @State()
  private _focusedOptionElement?: ListBoxOptionElement

  @Property({ type: Boolean, attribute: 'selection-follows-focus', reflect: true })
  selectionFollowsFocus?: boolean

  @Property({ type: Boolean, reflect: true })
  multiple?: boolean

  @QueryAll('queelag-listbox-option')
  optionElements!: ListBoxOptionElement[]

  @Query('queelag-listbox-option[selected]')
  selectedOptionElement?: ListBoxOptionElement

  @Property({ type: Boolean, attribute: 'select-first-option-on-focus', reflect: true })
  selectFirstOptionOnFocus?: boolean

  @Property({ type: Boolean, attribute: 'typeahead-debounce-time' })
  typeaheadDebounceTime?: number

  @Internal()
  typeaheadValue: string = ''

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('blur', this.onBlur)
    this.addEventListener('focus', this.onFocus)
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('blur', this.onBlur)
    this.removeEventListener('focus', this.onFocus)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onBlur = (): void => {
    this.focusedOptionElement = undefined
    ElementLogger.verbose(this.uid, 'onBlur', `The focused option has been unset.`)
  }

  onFocus = (): void => {
    if (this.selectedOptionElement) {
      this.focusedOptionElement = this.selectedOptionElement
      ElementLogger.verbose(this.uid, 'onFocus', `The selected option has been focused.`)

      return
    }

    this.focusedOptionElement = this.optionElements[0]
    ElementLogger.verbose(this.uid, 'onFocus', `The first option has been focused.`)

    if (this.selectFirstOptionOnFocus && this.single) {
      this.optionElements[0]?.setAttribute('selected', '')
      ElementLogger.verbose(this.uid, 'onFocus', `The first option has been selected.`)
    }
  }

  onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case KeyboardEventKey.A:
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_LEFT:
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.END:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.SPACE:
        event.preventDefault()
        event.stopPropagation()

        break
    }

    switch (event.key) {
      case KeyboardEventKey.A:
        if (this.single || !event.ctrlKey) {
          return
        }

        if (this.optionElements.every((element: ListBoxOptionElement) => element.selected)) {
          for (let element of this.optionElements) {
            element.selected = false
          }
          ElementLogger.verbose(this.uid, 'onKeyDown', `Every option has been unselected.`)

          break
        }

        for (let element of this.optionElements) {
          element.selected = true
        }
        ElementLogger.verbose(this.uid, 'onKeyDown', `Every option has been selected.`)

        break
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_RIGHT:
        if (this.focusedOptionElementIndex >= this.optionElements.length - 1) {
          this.focusedOptionElement = this.optionElements[0]
          ElementLogger.verbose(this.uid, 'onKeyDown', `The first option has been focused.`)

          return
        }

        this.focusedOptionElement = this.optionElements[this.focusedOptionElementIndex + 1]
        ElementLogger.verbose(this.uid, 'onKeyDown', `The next option has been focused.`)

        if (this.multiple && event.ctrlKey) {
          this.focusedOptionElement.selected = !this.focusedOptionElement.selected
          ElementLogger.verbose(this.uid, 'onKeyDown', `The next option has been selected.`)
        }

        break
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.ARROW_LEFT:
        if (this.focusedOptionElementIndex === 0) {
          this.focusedOptionElement = this.optionElements[this.optionElements.length - 1]
          ElementLogger.verbose(this.uid, 'onKeyDown', `The last option has been focused.`)

          return
        }

        this.focusedOptionElement = this.optionElements[this.focusedOptionElementIndex - 1]
        ElementLogger.verbose(this.uid, 'onKeyDown', `The previous option has been focused.`)

        if (this.multiple && event.ctrlKey) {
          this.focusedOptionElement.selected = !this.focusedOptionElement.selected
          ElementLogger.verbose(this.uid, 'onKeyDown', `The previous option has been selected.`)
        }

        break
      case KeyboardEventKey.END:
        this.focusedOptionElement = this.optionElements[this.optionElements.length - 1]
        ElementLogger.verbose(this.uid, 'onKeyDown', `The last option has been focused.`)

        if (this.multiple && event.ctrlKey && event.shiftKey) {
          for (let i = this.focusedOptionElementIndex; i < this.optionElements.length; i++) {
            this.optionElements[i].selected = true
          }
          ElementLogger.verbose(this.uid, 'onKeyDown', `Every option from the focused one to the last one has been selected.`)
        }

        break
      case KeyboardEventKey.HOME:
        this.focusedOptionElement = this.optionElements[0]
        ElementLogger.verbose(this.uid, 'onKeyDown', `The first option has been focused.`)

        if (this.multiple && event.ctrlKey && event.shiftKey) {
          for (let i = 0; i < this.focusedOptionElementIndex; i++) {
            this.optionElements[i].selected = true
          }
          ElementLogger.verbose(this.uid, 'onKeyDown', `Every option from the first one to the focused one has been selected.`)
        }

        break
      case KeyboardEventKey.SPACE:
        this.focusedOptionElement?.click()
        break
      default:
        typeahead(
          this.typeaheadDebounceTime,
          this.optionElements,
          event,
          () => this.typeaheadValue,
          (element: ListBoxOptionElement) => {
            this.focusedOptionElement = element
          },
          (value: string) => {
            this.typeaheadValue = value
          },
          this.uid
        )
        break
    }
  }

  isOptionElementFocused(element: ListBoxOptionElement): boolean {
    return element === this.focusedOptionElement
  }

  get focusedOptionElement(): ListBoxOptionElement | undefined {
    return this._focusedOptionElement
  }

  set focusedOptionElement(element: ListBoxOptionElement | undefined) {
    let old: ListBoxOptionElement | undefined

    old = this._focusedOptionElement
    this._focusedOptionElement = element

    if (this.selectionFollowsFocus && this.single) {
      old && Reflect.set(old, 'selected', false)
      element && Reflect.set(element, 'selected', true)
    }

    this.requestUpdate('focusedOptionElement')
  }

  get focusedOptionElementIndex(): number {
    return this.focusedOptionElement ? this.optionElements.indexOf(this.focusedOptionElement) : -1
  }

  get name(): ElementName {
    return ElementName.LISTBOX
  }

  get single(): boolean {
    return !this.multiple
  }
}

@CustomElement('queelag-listbox-option')
export class ListBoxOptionElement extends BaseElement {
  protected aria: AriaListBoxOptionController = new AriaListBoxOptionController(this)

  @Property({ type: Boolean, reflect: true })
  focused?: boolean

  @Closest('queelag-listbox')
  listBoxElement!: ListBoxElement

  @Property({ type: Boolean, reflect: true })
  selected?: boolean

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.onClick)
    this.addEventListener('mousedown', this.onMouseDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.onClick)
    this.removeEventListener('mousedown', this.onMouseDown)
  }

  onClick = (): void => {
    if (this.listBoxElement.multiple) {
      this.selected = !this.selected
      ElementLogger.verbose(this.uid, 'onClick', `The option has been ${this.selected ? 'selected' : 'unselected'}.`)
    }

    if (this.listBoxElement.single) {
      for (let element of this.listBoxElement.optionElements) {
        element.selected = false
      }

      this.selected = true
      ElementLogger.verbose(this.uid, 'onClick', `The option has been selected.`)
    }

    this.listBoxElement.focusedOptionElement = this
    ElementLogger.verbose(this.uid, 'onClick', `The option has been focused.`)
  }

  onMouseDown = (event: MouseEvent): void => {
    // event.preventDefault()
  }

  get name(): ElementName {
    return ElementName.LISTBOX_OPTION
  }

  static styles = [
    super.styles,
    css`
      :host {
        cursor: pointer;
      }
    `
  ]
}
