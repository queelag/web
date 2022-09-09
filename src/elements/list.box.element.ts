import { css } from 'lit'
import { AriaListBoxController } from '../controllers/aria.list.box.controller'
import { AriaListBoxOptionController } from '../controllers/aria.list.box.option.controller'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { State } from '../decorators/state'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
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

  @Property({ type: Boolean, reflect: true })
  multiple?: boolean

  @QueryAll('queelag-listbox-option')
  optionElements!: ListBoxOptionElement[]

  @Query('queelag-listbox-option[selected]')
  selectedOptionElement?: ListBoxOptionElement

  @Property({ type: Boolean, attribute: 'select-on-focus', reflect: true })
  selectOnFocus?: boolean

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
    ElementLogger.verbose(this.uid, 'onBlur', `The focused option element has been unset.`)
  }

  onFocus = (): void => {
    if (this.selectOnFocus && this.single && !this.selectedOptionElement) {
      this.optionElements[0]?.setAttribute('selected', '')
      ElementLogger.verbose(this.uid, 'onFocus', `The first option element has been selected.`)
    }

    this.focusedOptionElement = this.selectedOptionElement
    ElementLogger.verbose(this.uid, 'onFocus', `The selected option element has been focused.`)
  }

  onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case KeyboardEventKey.ARROW_DOWN:
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
        if (this.focusedOptionElementIndex >= this.optionElements.length - 1) {
          this.focusedOptionElement = this.optionElements[0]
          ElementLogger.verbose(this.uid, 'onKeyDown', `The first option element has been focused.`)

          return
        }

        this.focusedOptionElement = this.optionElements[this.focusedOptionElementIndex + 1]
        ElementLogger.verbose(this.uid, 'onKeyDown', `The next option element has been focused.`)

        break
      case KeyboardEventKey.ARROW_UP:
        if (this.focusedOptionElementIndex === 0) {
          this.focusedOptionElement = this.optionElements[this.optionElements.length - 1]
          ElementLogger.verbose(this.uid, 'onKeyDown', `The last option element has been focused.`)

          return
        }

        this.focusedOptionElement = this.optionElements[this.focusedOptionElementIndex - 1]
        ElementLogger.verbose(this.uid, 'onKeyDown', `The previous option element has been focused.`)

        break
      case KeyboardEventKey.END:
        this.focusedOptionElement = this.optionElements[this.optionElements.length - 1]
        ElementLogger.verbose(this.uid, 'onKeyDown', `The last option element has been focused.`)

        break
      case KeyboardEventKey.HOME:
        this.focusedOptionElement = this.optionElements[0]
        ElementLogger.verbose(this.uid, 'onKeyDown', `The first option element has been focused.`)

        break
      case KeyboardEventKey.SPACE:
        this.focusedOptionElement?.click()
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

    if (this.selectOnFocus && this.single) {
      old?.removeAttribute('selected')
      element?.setAttribute('selected', '')
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

      return
    }

    for (let element of this.listBoxElement.optionElements) {
      element.selected = false
    }

    this.selected = true
    ElementLogger.verbose(this.uid, 'onClick', `The option has been selected.`)

    this.listBoxElement.focusedOptionElement = this
    ElementLogger.verbose(this.uid, 'onClick', `The option has been focused.`)
  }

  onMouseDown = (event: MouseEvent): void => {
    // event.preventDefault()
  }

  get name(): ElementName {
    return ElementName.LISTBOX_OPTION
  }

  get listBoxElement(): ListBoxElement {
    let parent: HTMLElement | null = this.parentElement

    while (parent?.tagName === 'queelag-listbox') {
      parent = parent?.parentElement || null
      if (parent === null) break
    }

    return parent as ListBoxElement
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
