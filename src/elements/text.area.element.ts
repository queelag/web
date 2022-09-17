import { parseNumber } from '@queelag/core'
import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { DirectiveResult } from 'lit-html/directive'
import { ElementName } from '../definitions/enums'
import { QueryDeclarations } from '../definitions/interfaces'
import { TextAreaElementResize, TextAreaElementTouchTrigger, TextAreaElementValue } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { styleMap } from '../directives/style.map'
import { ElementLogger } from '../loggers/element.logger'
import { FormFieldElement } from './core/form.field.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-textarea': TextAreaElement
  }
}

export class TextAreaElement extends FormFieldElement {
  autosize?: boolean
  cols?: number
  private computedHeight?: string
  multiple?: boolean
  normalized?: boolean
  padding?: string
  placeholder?: string
  resize?: TextAreaElementResize
  rows?: number
  temporaryValue: string = ''
  touchTrigger?: TextAreaElementTouchTrigger

  /**
   * QUERIES
   */
  private spanElement!: HTMLSpanElement
  private textAreaElement!: HTMLTextAreaElement

  private onBlur(): void {
    this.focused = false
    ElementLogger.verbose(this.uid, 'onBlur', `The textarea has been blurred.`)

    if (this.touchTrigger === 'blur') {
      this.touch()
    }
  }

  private onFocus(): void {
    this.focused = true
    ElementLogger.verbose(this.uid, 'onFocus', `The textarea has been focused.`)
  }

  private onInput(): void {
    if (this.multiple) {
      this.temporaryValue = this.textAreaElement.value
      ElementLogger.verbose(this.uid, 'onInput', `The temporary value has been set.`, [this.temporaryValue])
    }

    if (!this.multiple) {
      this.value = this.textAreaElement.value
      ElementLogger.verbose(this.uid, 'onInput', `The value has been set.`, [this.value])
    }

    if (this.touchTrigger === 'change') {
      this.touch()
    }

    this.computeHeight()
  }

  private onKeyUp(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || !this.multiple) {
      return
    }

    if (this.temporaryValue.length <= 0) {
      return ElementLogger.warn(this.uid, 'onKeyUp', `The temporary value is empty.`)
    }

    this.value = [...(this.value as string[]), this.temporaryValue]
    ElementLogger.verbose(this.uid, 'onKeyUp', `The item has been pushed.`, [this.temporaryValue], this.value)

    this.textAreaElement.value = ''
    ElementLogger.verbose(this.uid, 'onKeyUp', `The textarea element value has been reset.`)

    this.touch()
  }

  private computeHeight(): void {
    let style: CSSStyleDeclaration

    if (!this.autosize) {
      return
    }

    style = getComputedStyle(this.textAreaElement)

    if (typeof this.computedHeight === 'undefined') {
      for (let property in style) {
        this.spanElement.style.cssText += `${property}:${style[property]};`
      }

      this.spanElement.style.minHeight = style.height
      this.spanElement.style.opacity = '0'
      this.spanElement.style.pointerEvents = 'none'
      this.spanElement.style.position = 'absolute'
      this.spanElement.style.whiteSpace = 'pre-wrap'
      this.spanElement.style.wordBreak = 'break-all'
    }

    this.spanElement.innerText = this.textAreaElement.value + 'a'
    this.spanElement.style.height = 'auto'
    this.spanElement.style.maxHeight = 'auto'
    this.spanElement.style.maxWidth = parseNumber(style.width) + parseNumber(style.paddingLeft) + parseNumber(style.paddingRight) + 'px'

    this.computedHeight = getComputedStyle(this.spanElement).height
    ElementLogger.verbose(this.uid, 'computeHeight', `The height has been computed.`, [this.computedHeight])
  }

  clear(): void {
    this.value = this.multiple ? [] : ''
    ElementLogger.verbose(this.uid, 'clear', `The value has been reset.`, [this.value])

    this.computedHeight = undefined
    ElementLogger.verbose(this.uid, 'clear', `The computed height has unset.`)

    this.textAreaElement.value = ''
    ElementLogger.verbose(this.uid, 'clear', `The textarea element value has been reset.`)

    this.textAreaElement.focus()
    ElementLogger.verbose(this.uid, 'clear', `The textarea element has been focused.`)

    this.touch()
  }

  render() {
    return html`
      <textarea
        ?autofocus=${this.autofocus}
        @blur=${this.onBlur}
        cols=${ifdef(this.cols)}
        ?disabled=${this.disabled}
        @focus=${this.onFocus}
        @input=${this.onInput}
        @keyup=${this.onKeyUp}
        placeholder=${ifdef(this.placeholder)}
        rows=${ifdef(this.rows)}
        style=${this.textAreaElementStyle}
        .value=${ifdef(this.textAreaElementValue)}
      ></textarea>
      <span></span>
    `
  }

  get name(): ElementName {
    return ElementName.TEXTAREA
  }

  private get textAreaElementStyle(): DirectiveResult {
    return styleMap({ ...this.styleInfo, minHeight: this.computedHeight, padding: this.padding, resize: this.resize })
  }

  private get textAreaElementValue(): string | undefined {
    if (this.multiple) {
      return this.temporaryValue
    }

    return super.value
  }

  get value(): TextAreaElementValue {
    if (this.multiple) {
      return super.value || []
    }

    return super.value
  }

  set value(value: TextAreaElementValue) {
    super.value = value
  }

  static properties = {
    ...super.properties,
    autosize: { type: Boolean, reflect: true },
    cols: { type: Number, reflect: true },
    computedHeight: { state: true },
    multiple: { type: Boolean, reflect: true },
    normalized: { type: Boolean, reflect: true },
    padding: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    resize: { type: String, reflect: true },
    rows: { type: Number, reflect: true },
    temporaryValue: { state: true },
    touchTrigger: { type: String, attribute: 'touch-trigger', reflect: true }
  }

  static queries: QueryDeclarations = {
    spanElement: { selector: 'span', shadow: true },
    textAreaElement: { selector: 'textarea', shadow: true }
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

customElements.define('q-textarea', TextAreaElement)
