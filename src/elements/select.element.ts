import { removeArrayItems } from '@queelag/core'
import { html } from 'lit-html'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { State } from '../decorators/state'
import { ElementName } from '../definitions/enums'
import { SelectOption } from '../definitions/interfaces'
import { map } from '../directives/map'
import { StateChangedEvent } from '../events/state.changed.event'
import { ElementLogger } from '../loggers/element.logger'
import { FormFieldElement } from '../mixins/form.field.element'

@CustomElement('queelag-select')
export class SelectElement extends FormFieldElement {
  @Property({ type: Boolean, reflect: true })
  multiple?: boolean

  @Property({ type: Boolean, reflect: true })
  native?: boolean

  @Property({ type: Boolean, reflect: true })
  normalized?: boolean

  @Property({ type: Object })
  options?: SelectOption[]

  @State()
  private search_value: string = ''

  private onChange(event: InputEvent): void {
    let option: SelectOption | undefined

    if (this.multiple && this.native) {
      return ElementLogger.warn(this.uid, 'onChange', `The multiple and native properties are not supported together.`)
    }

    // @ts-ignore
    option = this.find_option_by_value(event.target.value)
    if (!option) return

    this.onClickOption(option)
  }

  onClickOption(option: SelectOption): void {
    this.search_value = ''

    if (this.multiple) {
      this.value = this.value || []
      this.value = this.value.includes(option.value) ? removeArrayItems(this.value, [option.value]) : [...this.value, option.value]

      return
    }

    this.value = option.value
  }

  onClickRemoveOption(option: SelectOption): void {
    if (this.multiple) {
      this.value = this.value || []
      this.value = removeArrayItems(this.value, [option])

      return
    }

    ElementLogger.warn(this.uid, 'onClickRemoveOption', `This method does not work without the multiple property.`)
  }

  onCollapse(): void {
    this.search_value = ''
  }

  onEscape(): void {
    this.search_value = ''
  }

  onSearchInput = (event: Event): void => {
    let old: string = this.search_value

    // @ts-ignore
    this.search_value = event.target.value
    ElementLogger.verbose(this.uid, 'onSearchInput', `The search value has been set.`, [this.search_value])

    this.dispatchEvent(new StateChangedEvent('search_value', old, this.search_value))
  }

  clear(): void {
    this.search_value = ''
    this.value = this.multiple ? [] : ''
  }

  findOptionLabelByValue(value: any): string | undefined {
    return this.findOptionByValue(value)?.label
  }

  findOptionByValue(value: any): SelectOption | undefined {
    return this.options?.find((option: SelectOption) => option.value === value)
  }

  filterOptionsBySearchValue(options?: SelectOption[]): SelectOption[] | undefined {
    return options?.filter((option: SelectOption) => String(option.label).includes(this.search_value) || String(option.value).includes(this.search_value))
  }

  render() {
    if (this.native) {
      return html`
        <select @change=${this.onChange}>
          ${map(
            this.options || [],
            (option: SelectOption) => html` <option ?selected=${option.value === this.value} value=${option.value}>${option.label || option.value}</option> `
          )}
        </select>
      `
    }

    return html`<slot></slot>`
  }

  get name(): ElementName {
    return ElementName.SELECT
  }

  get options_filtered_by_search_value(): SelectOption[] | undefined {
    return this.filterOptionsBySearchValue(this.options)
  }

  private get selected_option(): SelectOption | undefined {
    return this.findOptionByValue(this.value)
  }

  get value(): any | any[] {
    return super.value
  }

  set value(value: any | any[]) {
    super.value = value
  }
}
