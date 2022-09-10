import { getLimitedNumber } from '@queelag/core'
import { css } from 'lit'
import { AriaComboBoxButtonController } from '../controllers/aria.combo.box.button.controller'
import { AriaComboBoxController } from '../controllers/aria.combo.box.controller'
import { AriaComboBoxInputController } from '../controllers/aria.combo.box.input.controller'
import { AriaComboBoxListController } from '../controllers/aria.combo.box.list.controller'
import { AriaComboBoxListOptionController } from '../controllers/aria.combo.box.list.option.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Internal } from '../decorators/internal'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { ComboBoxElementAutoComplete } from '../definitions/types'
import { StateChangedEvent } from '../events/state.changed.event'
import { typeahead } from '../functions/typeahead'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'
import { FloatingElement } from './floating.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-combobox': ComboBoxElement
    'queelag-combobox-button': ComboBoxButtonElement
    'queelag-combobox-group': ComboBoxGroupElement
    'queelag-combobox-input': ComboBoxInputElement
    'queelag-combobox-list': ComboBoxListElement
    'queelag-combobox-list-option': ComboBoxListOptionElement
  }
}

@CustomElement('queelag-combobox')
export class ComboBoxElement extends BaseElement {
  protected aria: AriaComboBoxController = new AriaComboBoxController(this)

  @Property({ type: String, reflect: true })
  autocomplete?: ComboBoxElementAutoComplete

  private _expanded?: boolean

  @Query('queelag-combobox-button')
  buttonElement?: ComboBoxButtonElement

  @Query('queelag-combobox-group')
  groupElement!: ComboBoxGroupElement

  @Query('queelag-combobox-input')
  inputElement?: ComboBoxInputElement

  @Query('queelag-combobox-list')
  listElement?: ComboBoxListElement

  @QueryAll('queelag-combobox-list-option')
  listOptionElements!: ComboBoxListOptionElement[]

  @Query('queelag-combobox-list-option[focused]')
  focusedListOptionElement?: ComboBoxListOptionElement

  @Query('queelag-combobox-list-option[selected]')
  selectedListOptionElement?: ComboBoxListOptionElement

  @Internal()
  typeaheadValue: string = ''

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('blur', this.onBlur)
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('blur', this.onBlur)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)
    this.listElement?.computePosition()
  }

  onBlur = (): void => {
    console.log(this.uid, 'BLUR')
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

        break
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_DOWN:
      case KeyboardEventKey.ARROW_UP:
      case KeyboardEventKey.END:
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.SPACE:
        if (this.collapsed) {
          this.expanded = true
          ElementLogger.verbose(this.uid, 'onKeyDown', `The combobox has been expanded.`)

          return
        }

        break
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_DOWN:
        if (this.focusedListOptionElementIndex >= this.listOptionElements.length - 1) {
          break
        }

        if (this.focusedListOptionElement) {
          this.focusedListOptionElement.focused = false
        }

        this.listOptionElements[this.focusedListOptionElementIndex + 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The next option has been focused.`)

        break
      case KeyboardEventKey.ARROW_UP:
        if (event.altKey && this.focusedListOptionElement) {
          this.focusedListOptionElement.selected = true
          ElementLogger.verbose(this.uid, 'onKeyDown', `The focused option has been selected.`)

          this.expanded = false
          ElementLogger.verbose(this.uid, 'onKeyDown', `The combobox has been collapsed.`)

          break
        }

        if (this.focusedListOptionElementIndex <= 0) {
          break
        }

        if (this.focusedListOptionElement) {
          this.focusedListOptionElement.focused = false
        }

        this.listOptionElements[this.focusedListOptionElementIndex - 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The previous option has been focused.`)

        break
      case KeyboardEventKey.END:
        this.listOptionElements[this.listOptionElements.length - 1].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The last option has been focused.`)

        break
      case KeyboardEventKey.HOME:
        this.listOptionElements[0].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The first option has been focused.`)

        break
      case KeyboardEventKey.ENTER:
      case KeyboardEventKey.SPACE:
        this.focusedListOptionElement?.click()
        break
      case KeyboardEventKey.ESCAPE:
        if (this.focusedListOptionElement) {
          this.focusedListOptionElement.focused = false
          ElementLogger.verbose(this.uid, 'onKeyDown', `The focused option has been blurred.`)
        }

        this.expanded = false
        ElementLogger.verbose(this.uid, 'onKeyDown', `The combobox has been collapsed.`)

        // if (this.expanded) {
        //   this.expanded = false
        //   ElementLogger.verbose(this.uid, 'onKeyDown', `The combobox has been collapsed.`)

        //   if (this.focusedListOptionElement) {
        //     this.focusedListOptionElement.focused = false
        //     ElementLogger.verbose(this.uid, 'onKeyDown', `The focused option has been blurred.`)
        //   }

        //   break
        // }

        // if (this.inputElement?.inputElement) {
        //   this.inputElement.inputElement.value = ''
        //   ElementLogger.verbose(this.uid, 'onKeyDown', `The input value has been reset.`)
        // }

        // if (this.selectedListOptionElement) {
        //   this.selectedListOptionElement.selected = false
        //   ElementLogger.verbose(this.uid, 'onKeyDown', `The selected option has been unselected.`)
        // }

        break
      case KeyboardEventKey.PAGE_DOWN:
        if (this.focusedListOptionElement) {
          this.focusedListOptionElement.focused = false
        }

        this.listOptionElements[getLimitedNumber(getLimitedNumber(this.focusedListOptionElementIndex, 0) + 10, 0)].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The option focus has jumped ~10 options ahead.`)

        break
      case KeyboardEventKey.PAGE_UP:
        if (this.focusedListOptionElement) {
          this.focusedListOptionElement.focused = false
        }

        this.listOptionElements[getLimitedNumber(this.focusedListOptionElementIndex - 10, 0)].focused = true
        ElementLogger.verbose(this.uid, 'onKeyDown', `The option focus has jumped ~10 options behind.`)

        break
      default:
        if (event.key.length > 1) {
          return
        }

        if (this.collapsed) {
          this.expanded = true
          ElementLogger.verbose(this.uid, 'onKeyDown', `The combobox has been expanded.`)
        }

        typeahead(
          undefined,
          this.listOptionElements,
          event,
          () => this.typeaheadValue,
          (element: ComboBoxListOptionElement) => {
            this.focusedListOptionElement?.removeAttribute('focused')
            element.focused = true
          },
          (value: string) => {
            this.typeaheadValue = value
          },
          this.uid
        )

        break
    }
  }

  isListOptionElementFocused(element: ComboBoxListOptionElement): boolean {
    return element === this.focusedListOptionElement
  }

  get collapsed(): boolean {
    return !this.expanded
  }

  get editable(): boolean {
    return typeof this.inputElement !== 'undefined'
  }

  @Property({ type: Boolean, reflect: true })
  get expanded(): boolean | undefined {
    return this._expanded
  }

  set expanded(expanded: boolean | undefined) {
    let old: boolean | undefined

    old = this._expanded
    this._expanded = expanded

    if (!expanded) {
      this.selectedListOptionElement?.removeAttribute('selected')
      this.focusedListOptionElement?.setAttribute('selected', '')
    }

    this.requestUpdate('expanded', old)
  }

  get focusedListOptionElementIndex(): number {
    return this.focusedListOptionElement ? this.listOptionElements.indexOf(this.focusedListOptionElement) : -1
  }

  get name(): ElementName {
    return ElementName.COMBOBOX
  }

  get selectedListOptionElementIndex(): number {
    return this.selectedListOptionElement ? this.listOptionElements.indexOf(this.selectedListOptionElement) : -1
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
    this.rootElement.expanded = false
    ElementLogger.verbose(this.uid, 'onBlur', `The combobox has been collapsed.`)
  }

  onClick = (): void => {
    this.rootElement.expanded = !this.rootElement.expanded
    ElementLogger.verbose(this.uid, 'onClick', `The combobox has been ${this.rootElement.expanded ? 'expanded' : 'collapsed'}.`)
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
  inputElement!: HTMLInputElement

  @Closest('queelag-combobox')
  rootElement!: ComboBoxElement

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
        position: absolute;
        right: 0;
        z-index: 1;
      }
    `
  ]
}

@CustomElement('queelag-combobox-list-option')
export class ComboBoxListOptionElement extends BaseElement {
  protected aria: AriaComboBoxListOptionController = new AriaComboBoxListOptionController(this)

  @Property({ type: Boolean, reflect: true })
  focused?: boolean

  @Closest('queelag-combobox')
  rootElement!: ComboBoxElement

  private _selected?: boolean

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
    for (let element of this.rootElement.listOptionElements) {
      element.selected = false
    }

    this.selected = true
    ElementLogger.verbose(this.uid, 'onClick', `The option has been selected.`)

    switch (this.rootElement.autocomplete) {
      case 'both':
      case 'inline':
      case 'list':
        this.rootElement.inputElement?.focus()
        break
      default:
        this.rootElement.buttonElement?.focus()
        break
    }

    this.rootElement.expanded = false
    ElementLogger.verbose(this.uid, 'onClick', `The combobox has been collapsed.`)
  }

  onMouseDown = (event: MouseEvent): void => {
    event.preventDefault()
  }

  get name(): ElementName {
    return ElementName.COMBOBOX_LIST_OPTION
  }

  @Property({ type: Boolean, reflect: true })
  get selected(): boolean | undefined {
    return this._selected
  }

  set selected(selected: boolean | undefined) {
    let old: boolean | undefined

    old = this._selected
    this._selected = selected

    if (selected) {
      if (this.rootElement.focusedListOptionElement) {
        this.rootElement.focusedListOptionElement.focused = false
      }

      this.focused = true
    }

    this.requestUpdate('selected', old)
    this.rootElement.dispatchEvent(new StateChangedEvent('selected', false, true))
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
