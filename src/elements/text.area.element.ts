import { parseNumber } from '@queelag/core'
import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { DirectiveResult } from 'lit-html/directive'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { State } from '../decorators/state'
import { ElementName } from '../definitions/enums'
import { TextAreaResize, TextAreaTouchTrigger, TextAreaValue } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { stylemap } from '../directives/style.map'
import { ElementLogger } from '../loggers/element.logger'
import { FormFieldElement } from '../mixins/form.field.element'

@CustomElement('queelag-textarea')
export class TextAreaElement extends FormFieldElement {
  @Property({ type: Boolean, reflect: true })
  autosize?: boolean

  @Property({ type: Number, reflect: true })
  cols?: number

  @State()
  private computed_height?: string

  @Property({ type: Boolean, reflect: true })
  multiple?: boolean

  @Property({ type: Boolean, reflect: true })
  normalized?: boolean

  @Property({ type: String, reflect: true })
  padding?: string

  @Property({ type: String, reflect: true })
  placeholder?: string

  @Property({ type: String, reflect: true })
  resize?: TextAreaResize

  @Property({ type: Number, reflect: true })
  rows?: number

  @Query('span')
  private span_element!: HTMLSpanElement

  @Query('textarea')
  private textarea_element!: HTMLTextAreaElement

  @State()
  temporary_value: string = ''

  @Property({ type: String, attribute: 'touch-trigger', reflect: true })
  touch_trigger?: TextAreaTouchTrigger

  private on_blur(): void {
    this.focused = false
    ElementLogger.verbose(this.uid, 'on_blur', `The focused property has been set to false.`)

    if (this.touch_trigger === 'blur') {
      this.touch()
    }
  }

  private on_focus(): void {
    this.focused = true
    ElementLogger.verbose(this.uid, 'on_blur', `The focused property has been set to true.`)
  }

  private on_input(): void {
    if (this.multiple) {
      this.temporary_value = this.textarea_element.value
      ElementLogger.verbose(this.uid, 'on_input', `The temporary value has been set.`, [this.temporary_value])
    }

    if (!this.multiple) {
      this.value = this.textarea_element.value
      ElementLogger.verbose(this.uid, 'on_input', `The value has been set.`, [this.value])
    }

    if (this.touch_trigger === 'change') {
      this.touch()
    }

    this.validate()
    this.compute_height()
  }

  private on_key_up(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || !this.multiple) {
      return
    }

    if (this.temporary_value.length <= 0) {
      return ElementLogger.warn(this.uid, 'on_key_up', `The temporary value is empty.`)
    }

    this.value = [...(this.value as string[]), this.temporary_value]
    this.textarea_element.value = ''

    this.touch()
  }

  private compute_height(): void {
    let textarea_computed_style: CSSStyleDeclaration

    if (!this.autosize) {
      return
    }

    textarea_computed_style = getComputedStyle(this.textarea_element)

    if (typeof this.computed_height === 'undefined') {
      for (let property in textarea_computed_style) {
        this.span_element.style.cssText += `${property}:${textarea_computed_style[property]};`
      }

      this.span_element.style.minHeight = textarea_computed_style.height
      this.span_element.style.opacity = '0'
      this.span_element.style.pointerEvents = 'none'
      this.span_element.style.position = 'absolute'
      this.span_element.style.whiteSpace = 'pre-wrap'
      this.span_element.style.wordBreak = 'break-all'
    }

    this.span_element.innerText = this.textarea_element.value + 'a'
    this.span_element.style.height = 'auto'
    this.span_element.style.maxHeight = 'auto'
    this.span_element.style.maxWidth =
      parseNumber(textarea_computed_style.width) + parseNumber(textarea_computed_style.paddingLeft) + parseNumber(textarea_computed_style.paddingRight) + 'px'

    this.computed_height = getComputedStyle(this.span_element).height
    ElementLogger.verbose(this.uid, 'compute_height', `The height has been computed.`, [this.computed_height])
  }

  clear(): void {
    this.value = this.multiple ? [] : ''

    this.computed_height = undefined
    this.textarea_element.value = ''
    this.textarea_element.focus()

    this.touch()
  }

  render() {
    return html`
      <textarea
        ?autofocus=${this.autofocus}
        @blur=${this.on_blur}
        cols=${ifdef(this.cols)}
        ?disabled=${this.disabled}
        @focus=${this.on_focus}
        @input=${this.on_input}
        @keyup=${this.on_key_up}
        placeholder=${ifdef(this.placeholder)}
        rows=${ifdef(this.rows)}
        style=${this.textarea_element_style}
        value=${ifdef(this.textarea_element_value)}
      ></textarea>
      <span></span>
    `
  }

  get name(): ElementName {
    return ElementName.TEXTAREA
  }

  private get textarea_element_style(): DirectiveResult {
    return stylemap({ ...this.style_info, minHeight: this.computed_height, padding: this.padding, resize: this.resize })
  }

  private get textarea_element_value(): string | undefined {
    if (this.multiple) {
      return this.temporary_value
    }

    return super.value
  }

  get value(): TextAreaValue {
    if (this.multiple) {
      return super.value || []
    }

    return super.value
  }

  set value(value: TextAreaValue) {
    super.value = value
  }

  static styles = [
    FormFieldElement.styles as CSSResult,
    css`
      :host([autosize]) textarea {
        overflow-y: hidden;
      }

      :host([normalized]) textarea {
        background: none;
        border: none;
        font: unset;
        outline: none;
        padding: 0;
      }

      span {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        white-space: pre-wrap;
        word-break: break-all;
      }
    `
  ]
}
