import { css } from 'lit'
import { AriaListBoxController } from '../controllers/aria-listbox/aria.list.box.controller'
import { AriaListBoxOptionController } from '../controllers/aria-listbox/aria.list.box.option.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Internal } from '../decorators/internal'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ElementLogger } from '../loggers/element.logger'
import { Typeahead } from '../modules/Typeahead'
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

  @Query('queelag-listbox-option[focused]')
  focusedOptionElement?: ListBoxOptionElement

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

  @Internal()
  typeahead: Typeahead<ListBoxOptionElement> = new Typeahead((element: ListBoxOptionElement) => {
    this.blurFocusedOptionElement()

    element.focused = true
    ElementLogger.verbose(this.uid, 'typeahead', `The matched element has been focused.`)
  })

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
    if (this.focusedOptionElement) {
      this.focusedOptionElement.focused = false
      ElementLogger.verbose(this.uid, 'onBlur', `The focused option has been blurred.`)
    }
  }

  onFocus = (): void => {
    if (this.selectedOptionElement) {
      this.selectedOptionElement.focused = true
      ElementLogger.verbose(this.uid, 'onFocus', `The selected option has been focused.`)

      return
    }

    this.optionElements[0].focused = true
    ElementLogger.verbose(this.uid, 'onFocus', `The first option has been focused.`)

    if (this.selectFirstOptionOnFocus && this.single) {
      this.optionElements[0].selected = true
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
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_LEFT:
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.END:
      case KeyboardEventKey.HOME:
        this.blurFocusedOptionElement()

        if (this.selectionFollowsFocus && this.single) {
          this.unselectSelectedOptionElement()
        }

        break
    }

    switch (event.key) {
      case KeyboardEventKey.A:
        if (this.single || !event.ctrlKey) {
          break
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
          this.optionElements[0].focused = true
          ElementLogger.verbose(this.uid, 'onKeyDown', `The first option has been focused.`)

          if (this.selectionFollowsFocus && this.single) {
            this.optionElements[0].selected = true
          }

          break
        }

        this.optionElements[this.focusedOptionElementIndex + 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The next option has been focused.`)

        if (this.selectionFollowsFocus && this.single) {
          this.optionElements[this.focusedOptionElementIndex + 1].selected = true
        }

        if (this.multiple && event.ctrlKey && this.focusedOptionElement) {
          this.focusedOptionElement.selected = !this.focusedOptionElement.selected
          ElementLogger.verbose(this.uid, 'onKeyDown', `The next option has been selected.`)
        }

        break
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.ARROW_LEFT:
        if (this.focusedOptionElementIndex <= 0) {
          this.optionElements[this.optionElements.length - 1].focused = true
          ElementLogger.verbose(this.uid, 'onKeyDown', `The last option has been focused.`)

          if (this.selectionFollowsFocus && this.single) {
            this.optionElements[this.optionElements.length - 1].selected = true
          }

          break
        }

        this.optionElements[this.focusedOptionElementIndex - 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The previous option has been focused.`)

        if (this.selectionFollowsFocus && this.single) {
          this.optionElements[this.focusedOptionElementIndex - 1].selected = true
        }

        if (this.multiple && event.ctrlKey && this.focusedOptionElement) {
          this.focusedOptionElement.selected = !this.focusedOptionElement.selected
          ElementLogger.verbose(this.uid, 'onKeyDown', `The previous option has been selected.`)
        }

        break
      case KeyboardEventKey.END:
        this.optionElements[this.optionElements.length - 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The last option has been focused.`)

        if (this.multiple && event.ctrlKey && event.shiftKey) {
          for (let i = this.focusedOptionElementIndex; i < this.optionElements.length; i++) {
            this.optionElements[i].selected = true
          }
          ElementLogger.verbose(this.uid, 'onKeyDown', `Every option from the focused one to the last one has been selected.`)
        }

        break
      case KeyboardEventKey.HOME:
        this.optionElements[0].focused = true
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
        this.typeahead.handle(event, this.optionElements)
        break
    }
  }

  blurFocusedOptionElement(): void {
    if (this.focusedOptionElement) {
      this.focusedOptionElement.focused = false
    }
  }

  selectFocusedOptionElement(): void {
    if (this.focusedOptionElement) {
      this.focusedOptionElement.selected = true
    }
  }

  unselectSelectedOptionElement(): void {
    if (this.selectedOptionElement) {
      this.selectedOptionElement.selected = false
    }
  }

  isOptionElementFocused(element: ListBoxOptionElement): boolean {
    return element === this.focusedOptionElement
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

    this.listBoxElement.blurFocusedOptionElement()

    this.focused = true
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
