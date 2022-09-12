import { getLimitedNumber } from '@queelag/core'
import { css } from 'lit'
import { AriaComboBoxButtonController } from '../controllers/aria.combo.box.button.controller'
import { AriaComboBoxController } from '../controllers/aria.combo.box.controller'
import { AriaComboBoxInputController } from '../controllers/aria.combo.box.input.controller'
import { AriaComboBoxListController } from '../controllers/aria.combo.box.list.controller'
import { AriaComboBoxOptionController } from '../controllers/aria.combo.box.option.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Internal } from '../decorators/internal'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { State } from '../decorators/state'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ComboBoxElementAutoComplete } from '../definitions/types'
import { StateChangedEvent } from '../events/state.changed.event'
import { ElementLogger } from '../loggers/element.logger'
import { Typeahead } from '../modules/Typeahead'
import { scrollElementIntoView } from '../utils/element.utils'
import { BaseElement } from './base.element'
import { FloatingElement } from './floating.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-combobox': ComboBoxElement
    'queelag-combobox-button': ComboBoxButtonElement
    'queelag-combobox-group': ComboBoxGroupElement
    'queelag-combobox-input': ComboBoxInputElement
    'queelag-combobox-list': ComboBoxListElement
    'queelag-combobox-option': ComboBoxOptionElement
  }
}

@CustomElement('queelag-combobox')
export class ComboBoxElement extends BaseElement {
  protected aria: AriaComboBoxController = new AriaComboBoxController(this)

  @Property({ type: String, reflect: true })
  autocomplete?: ComboBoxElementAutoComplete

  @Property({ type: Boolean, reflect: true })
  expanded?: boolean

  @Query('queelag-combobox-button')
  buttonElement?: ComboBoxButtonElement

  @Query('queelag-combobox-group')
  groupElement!: ComboBoxGroupElement

  @Query('queelag-combobox-input')
  inputElement?: ComboBoxInputElement

  @Query('queelag-combobox-list')
  listElement?: ComboBoxListElement

  @Query('queelag-combobox-option[focused]')
  focusedOptionElement?: ComboBoxOptionElement

  @QueryAll('queelag-combobox-option')
  optionElements!: ComboBoxOptionElement[]

  @Property({ type: Object, attribute: 'scroll-into-view-options' })
  scrollIntoViewOptions?: ScrollIntoViewOptions

  @Query('queelag-combobox-option[selected]')
  selectedOptionElement?: ComboBoxOptionElement

  @Internal()
  typeahead: Typeahead<ComboBoxOptionElement> = new Typeahead((element: ComboBoxOptionElement) => {
    this.blurFocusedOptionElement()

    element.focused = true
    ElementLogger.verbose(this.uid, 'typeahead', `The matched element has been focused.`)
  })

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.onKeyDown)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)
    this.listElement?.computePosition && this.listElement.computePosition()
  }

  onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.END:
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.ESCAPE:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.SPACE:
        event.preventDefault()
        event.stopPropagation()
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_UP:
        if (this.collapsed) {
          this.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The combobox has been expanded.`)

          if (this.selectedOptionElement) {
            this.focusSelectedOptionElement()
            ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The selected option has been focused.`)

            return
          }

          if (this.inputElement && event.key === KeyboardEventKey.ARROW_DOWN) {
            this.optionElements[0].focused = true
          }

          if (this.inputElement && event.key === KeyboardEventKey.ARROW_UP) {
            this.optionElements[this.optionElements.length - 1].focused = true
          }

          return
        }
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_DOWN:
        if (this.focusedOptionElementIndex >= this.optionElements.length - 1) {
          if (this.inputElement) {
            this.blurFocusedOptionElement()

            this.optionElements[0].focused = true
            ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The first option has been focused.`)
          }

          break
        }

        this.blurFocusedOptionElement()

        this.optionElements[this.focusedOptionElementIndex + 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_DOWN', `The next option has been focused.`)

        break
      case KeyboardEventKey.ARROW_UP:
        if (this.focusedOptionElementIndex <= 0) {
          if (this.inputElement) {
            this.blurFocusedOptionElement()

            this.optionElements[this.optionElements.length - 1].focused = true
            ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The last option has been focused.`)
          }

          break
        }

        this.blurFocusedOptionElement()

        this.optionElements[this.focusedOptionElementIndex - 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_UP', `The previous option has been focused.`)

        break
      case KeyboardEventKey.END:
        if (this.collapsed) {
          this.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'END', `The combobox has been expanded.`)
        }

        this.optionElements[this.optionElements.length - 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', 'END', `The last option has been focused.`)

        break
      case KeyboardEventKey.HOME:
        if (this.collapsed) {
          this.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The combobox has been expanded.`)
        }

        this.optionElements[0].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The first option has been focused.`)

        break
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        if (this.collapsed) {
          this.expand()
          this.focusSelectedOptionElement()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ENTER or SPACE', `The combobox has been expanded and the selected option has been focused.`)

          break
        }

        if (this.focusedOptionElement) {
          this.focusedOptionElement?.click()
          break
        }

        if (this.expanded) {
          this.collapse()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ENTER or SPACE', `The combobox has been collapsed.`)
        }

        break
      case KeyboardEventKey.ESCAPE:
        if (this.collapsed && this.inputElement) {
          switch (this.autocomplete) {
            case 'both':
            case 'inline':
            case 'list':
              this.inputElement.clear()
              ElementLogger.verbose(this.uid, 'onKeyDown', 'ESCAPE', `The input value has been reset.`)
          }

          break
        }

        if (this.expanded) {
          this.collapse()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ESCAPE', `The combobox has been collapsed.`)

          if (this.inputElement?.inputElement && this.selectedOptionElement) {
            this.inputElement.inputElement.value = this.selectedOptionElement.innerText
            ElementLogger.verbose(this.uid, 'onKeyDown', 'ESCAPE', `The input value has been set to the selected option inner text.`)
          }

          this.blurFocusedOptionElement()
        }

        break
      case KeyboardEventKey.PAGE_DOWN:
        this.blurFocusedOptionElement()

        this.optionElements[getLimitedNumber(getLimitedNumber(this.focusedOptionElementIndex, 0) + 10, 0)].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', 'PAGE_DOWN', `The option focus has jumped ~10 options ahead.`)

        break
      case KeyboardEventKey.PAGE_UP:
        this.blurFocusedOptionElement()

        this.optionElements[getLimitedNumber(this.focusedOptionElementIndex - 10, 0)].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', 'PAGE_UP', `The option focus has jumped ~10 options behind.`)

        break
      default:
        if (this.inputElement || event.key.length > 1) {
          break
        }

        if (this.collapsed) {
          this.expand()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'DEFAULT', `The combobox has been expanded.`)
        }

        this.typeahead.handle(event, this.optionElements)

        break
    }
  }

  blurFocusedOptionElement(): void {
    if (this.focusedOptionElement) {
      this.focusedOptionElement.focused = false
    }
  }

  collapse(): void {
    this.expanded = false
  }

  expand(): void {
    this.expanded = true
  }

  filterOptions<T>(options: T[], predicate: (value: T, index: number, array: T[]) => unknown): T[] {
    switch (this.autocomplete) {
      case 'both':
      case 'inline':
      case 'list':
        return options.filter(predicate)
      default:
        return options
    }
  }

  focusSelectedOptionElement(): void {
    if (this.selectedOptionElement) {
      this.selectedOptionElement.focused = true
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

  isOptionElementFocused(element: ComboBoxOptionElement): boolean {
    return element === this.focusedOptionElement
  }

  get collapsed(): boolean {
    return !this.expanded
  }

  get editable(): boolean {
    return typeof this.inputElement !== 'undefined'
  }

  get focusedOptionElementIndex(): number {
    return this.focusedOptionElement ? this.optionElements.indexOf(this.focusedOptionElement) : -1
  }

  get name(): ElementName {
    return ElementName.COMBOBOX
  }

  get selectedOptionElementIndex(): number {
    return this.selectedOptionElement ? this.optionElements.indexOf(this.selectedOptionElement) : -1
  }

  static styles = [
    super.styles,
    css`
      :host {
        position: relative;
      }
    `
  ]
}

@CustomElement('queelag-combobox-group')
export class ComboBoxGroupElement extends BaseElement {
  get name(): ElementName {
    return ElementName.COMBOBOX_GROUP
  }
}

@CustomElement('queelag-combobox-button')
export class ComboBoxButtonElement extends BaseElement {
  protected aria: AriaComboBoxButtonController = new AriaComboBoxButtonController(this)

  @Closest('queelag-combobox')
  rootElement!: ComboBoxElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('blur', this.onBlur)
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('blur', this.onBlur)
    this.removeEventListener('click', this.onClick)
  }

  onBlur = (): void => {
    if (this.rootElement.focusedOptionElement) {
      this.rootElement.unselectSelectedOptionElement()
      this.rootElement.selectFocusedOptionElement()
      this.rootElement.blurFocusedOptionElement()

      ElementLogger.verbose(this.uid, 'onBlur', `The focused option has been selected && blurred.`)
    }

    if (this.rootElement.expanded) {
      this.rootElement.collapse()
      ElementLogger.verbose(this.uid, 'onBlur', `The combobox has been collapsed.`)
    }
  }

  onClick = (): void => {
    this.rootElement.expanded = !this.rootElement.expanded
    ElementLogger.verbose(this.uid, 'onClick', `The combobox has been ${this.rootElement.expanded ? 'expanded' : 'collapsed'}.`)

    if (this.rootElement.expanded) {
      this.rootElement.focusSelectedOptionElement()
    }
  }

  get name(): ElementName {
    return ElementName.COMBOBOX_BUTTON
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

@CustomElement('queelag-combobox-input')
export class ComboBoxInputElement extends BaseElement {
  protected aria: AriaComboBoxInputController = new AriaComboBoxInputController(this)

  @Query('input')
  inputElement?: HTMLInputElement

  @Closest('queelag-combobox')
  rootElement!: ComboBoxElement

  @State()
  value: string = ''

  connectedCallback(): void {
    super.connectedCallback()

    this.inputElement?.addEventListener('blur', this.onBlur)
    this.inputElement?.addEventListener('click', this.onClick)
    this.inputElement?.addEventListener('focus', this.onFocus)
    this.inputElement?.addEventListener('input', this.onInput)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.inputElement?.removeEventListener('blur', this.onBlur)
    this.inputElement?.removeEventListener('click', this.onClick)
    this.inputElement?.removeEventListener('focus', this.onFocus)
    this.inputElement?.removeEventListener('input', this.onInput)
  }

  onBlur = (): void => {
    this.rootElement.collapse()
    ElementLogger.verbose(this.uid, 'onBlur', `The combobox has been collapsed.`)
  }

  onClick = (): void => {
    this.rootElement.expand()
    ElementLogger.verbose(this.uid, 'onFocus', `The combobox has been expanded.`)

    this.rootElement.focusSelectedOptionElement()
    ElementLogger.verbose(this.uid, 'onFocus', `The selected option has been focused.`)
  }

  onFocus = (): void => {
    this.rootElement.expand()
    ElementLogger.verbose(this.uid, 'onFocus', `The combobox has been expanded.`)
  }

  onInput = (event: Event): void => {
    if (this.rootElement.collapsed) {
      this.rootElement.expand()
      this.rootElement.focusSelectedOptionElement()

      ElementLogger.verbose(this.uid, 'onFocus', `The combobox has been expanded and the selected option has been focused.`)
    }

    // @ts-ignore
    this.value = event.target.value
    ElementLogger.verbose(this.uid, 'onInput', `The value has been set.`, [this.value])

    this.rootElement.dispatchEvent(new StateChangedEvent('value', undefined, this.value))
  }

  clear(): void {
    if (this.inputElement) {
      this.inputElement.value = ''
    }
  }

  get name(): ElementName {
    return ElementName.COMBOBOX_INPUT
  }
}

@CustomElement('queelag-combobox-list')
export class ComboBoxListElement extends FloatingElement {
  protected aria: AriaComboBoxListController = new AriaComboBoxListController(this)

  @Closest('queelag-combobox')
  rootElement!: ComboBoxElement

  get name(): ElementName {
    return ElementName.COMBOBOX_LIST
  }

  get referenceElement(): ComboBoxGroupElement {
    return this.rootElement.groupElement
  }

  static styles = [
    super.styles,
    css`
      :host {
        left: 0;
        overflow-y: auto;
        position: absolute;
        right: 0;
        z-index: 1;
      }
    `
  ]
}

@CustomElement('queelag-combobox-option')
export class ComboBoxOptionElement extends BaseElement {
  protected aria: AriaComboBoxOptionController = new AriaComboBoxOptionController(this)

  @Property({ type: Boolean, reflect: true })
  focused?: boolean

  @Closest('queelag-combobox')
  rootElement!: ComboBoxElement

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

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name === 'focused' && value !== null) {
      if (this.rootElement.listElement) {
        scrollElementIntoView(this.rootElement.listElement, this, this.rootElement.scrollIntoViewOptions)
        ElementLogger.verbose(this.uid, ' attributeChangedCallback', `The option has been scrolled into view.`)
      }
    }

    if (name === 'selected' && value !== null) {
      if (this.rootElement.inputElement?.inputElement) {
        this.rootElement.inputElement.inputElement.value = this.innerText
        ElementLogger.verbose(this.uid, 'attributeChangedCallback', `The input value has been set to the inner text of this option.`, [this.innerText])
      }
    }
  }

  onClick = (): void => {
    this.rootElement.blurFocusedOptionElement()
    this.rootElement.unselectSelectedOptionElement()

    this.selected = true
    ElementLogger.verbose(this.uid, 'onClick', `The option has been selected.`)

    this.rootElement.expanded = false
    ElementLogger.verbose(this.uid, 'onClick', `The combobox has been collapsed.`)

    if (this.rootElement.inputElement) {
      this.rootElement.inputElement.inputElement?.focus()
      return
    }

    this.rootElement.buttonElement?.focus()
  }

  onMouseDown = (event: MouseEvent): void => {
    event.preventDefault()
  }

  get name(): ElementName {
    return ElementName.COMBOBOX_OPTION
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
