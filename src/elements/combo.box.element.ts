import { AriaComboBoxButtonController } from '../controllers/aria.combo.box.button.controller'
import { AriaComboBoxInputController } from '../controllers/aria.combo.box.input.controller'
import { AriaComboBoxListController } from '../controllers/aria.combo.box.list.controller'
import { AriaComboBoxListOptionController } from '../controllers/aria.combo.box.list.option.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { State } from '../decorators/state'
import { ElementName } from '../definitions/enums'
import { ComboBoxElementAutoComplete } from '../definitions/types'
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
  @Property({ type: String, reflect: true })
  autocomplete?: ComboBoxElementAutoComplete

  @Property({ type: Boolean, reflect: true })
  expanded?: boolean

  @Query('queelag-combobox-group')
  groupElement!: ComboBoxGroupElement

  @Query('queelag-combobox-input')
  inputElement?: ComboBoxInputElement

  @Query('queelag-combobox-list')
  listElement?: ComboBoxListElement

  @QueryAll('queelag-combobox-list-option')
  listOptionElements?: ComboBoxListOptionElement[]

  @State()
  focusedListOptionElement?: ComboBoxListOptionElement

  get editable(): boolean {
    return typeof this.inputElement !== 'undefined'
  }

  get name(): ElementName {
    return ElementName.COMBOBOX
  }
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

  get name(): ElementName {
    return ElementName.COMBOBOX_BUTTON
  }
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
}

@CustomElement('queelag-combobox-list-option')
export class ComboBoxListOptionElement extends BaseElement {
  protected aria: AriaComboBoxListOptionController = new AriaComboBoxListOptionController(this)

  @Property({ type: Boolean, reflect: true })
  selected?: boolean

  get name(): ElementName {
    return ElementName.COMBOBOX_LIST_OPTION
  }
}
