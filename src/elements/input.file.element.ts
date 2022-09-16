import { QueelagFile } from '@/classes/queelag.file'
import { CustomElement } from '@/decorators/custom.element'
import { Property } from '@/decorators/property'
import { QueryShadow } from '@/decorators/query.shadow'
import { DeserializeFileOptions } from '@/definitions/interfaces'
import { ElementLogger } from '@/loggers/element.logger'
import { deserializeFile } from '@/utils/file.utils'
import { removeArrayItems } from '@queelag/core'
import { css, CSSResult } from 'lit'
import { html } from 'lit-html'
import { FormFieldElement } from './core/form.field.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-input-file': InputFileElement
  }
}

@CustomElement('q-input-file')
export class InputFileElement extends FormFieldElement {
  @Property({ type: Boolean, attribute: 'deserialize-file-resolve-array-buffer', reflect: true })
  deserializeFileResolveArrayBuffer?: boolean

  @Property({ type: Boolean, attribute: 'deserialize-file-resolve-text', reflect: true })
  deserializeFileResolveText?: boolean

  @QueryShadow('input')
  private inputElement!: HTMLInputElement

  @Property({ type: Boolean, reflect: true })
  multiple?: boolean

  @Property({ type: Boolean, reflect: true })
  native?: boolean

  private async onChange(event: any): Promise<void> {
    let files: QueelagFile[] = []

    for (let file of event.target.files) {
      files.push(await deserializeFile(file, this.deserializeFileOptions))
      ElementLogger.verbose(this.uid, 'onChange', `The file have been deserialized.`, files)
    }

    if (this.multiple) {
      this.value = files
      ElementLogger.verbose(this.uid, 'onChange', `The files have been set as the value.`, files, this.value)

      return
    }

    this.value = files[0]
    ElementLogger.debug(this.id, 'onChange', `The first file has been set as the value.`, files, this.value)

    this.touch()
  }

  removeFile(file: QueelagFile): void {
    this.inputElement.value = ''
    ElementLogger.verbose(this.uid, 'removeFile', `The input element value has been reset.`)

    if (this.multiple) {
      this.value = this.value || []
      this.value = removeArrayItems(this.value as QueelagFile[], (_, { id }: QueelagFile) => id === file.id)
      ElementLogger.verbose(this.uid, 'onClickRemoveFile', `The file has been removed.`, file, this.value)

      return
    }

    this.value = QueelagFile.EMPTY
    ElementLogger.verbose(this.uid, 'onClickRemoveFile', `The value has been emptied.`, this.value)

    this.touch()
  }

  clear = (): void => {
    this.value = this.multiple ? [] : QueelagFile.EMPTY
    ElementLogger.verbose(this.uid, 'clear', `The value has been reset.`, this.value)

    this.inputElement.value = ''
    ElementLogger.verbose(this.uid, 'clear', `The input element value has been reset.`)

    this.touch()
  }

  open = (): void => {
    this.inputElement.click()
  }

  render() {
    if (this.native) {
      return html`<input @change=${this.onChange} ?disabled=${this.disabled} ?multiple=${this.multiple} ?readonly=${this.readonly} type="file" />`
    }

    return html`
      <input @change=${this.onChange} ?disabled=${this.disabled} ?multiple=${this.multiple} ?readonly=${this.readonly} type="file" />
      <slot></slot>
    `
  }

  get files(): QueelagFile[] {
    if (this.multiple) {
      return (this.value as QueelagFile[]) || []
    }

    return (this.value as QueelagFile)?.name ? [this.value as QueelagFile] : []
  }

  private get deserializeFileOptions(): DeserializeFileOptions {
    return {
      resolve: {
        arrayBuffer: this.deserializeFileResolveArrayBuffer,
        text: this.deserializeFileResolveText
      }
    }
  }

  get value(): QueelagFile | QueelagFile[] | undefined {
    return super.value
  }

  set value(value: QueelagFile | QueelagFile[] | undefined) {
    super.value = value
  }

  get isFilesEmpty(): boolean {
    return this.files.length <= 0
  }

  get isFilesNotEmpty(): boolean {
    return !this.isFilesEmpty
  }

  static styles = [
    super.styles as CSSResult,
    css`
      :host(:not([native])) {
        position: relative;
      }

      :host(:not([native])) input {
        height: 100%;
        opacity: 0;
        position: absolute;
        width: 100%;
      }
    `
  ]
}
