import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type {
  ComboBoxButtonElement,
  ComboBoxButtonElementAttributes,
  ComboBoxElement,
  ComboBoxElementAttributes,
  ComboBoxGroupElement,
  ComboBoxGroupElementAttributes,
  ComboBoxInputElement,
  ComboBoxInputElementAttributes,
  ComboBoxListElement,
  ComboBoxListElementAttributes,
  ComboBoxListOptionElement,
  ComboBoxListOptionElementAttributes
} from '../../../src'
import '../../../src/elements/combobox.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-combobox': ComboBoxProps
      'queelag-combobox-button': ComboBoxProps
      'queelag-combobox-group': ComboBoxProps
      'queelag-combobox-input': ComboBoxProps
      'queelag-combobox-list': ComboBoxProps
      'queelag-combobox-list-option': ComboBoxProps
    }
  }
}

interface ComboBoxProps extends ComboBoxElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxElement>, ComboBoxElement> {}
interface ComboBoxButtonProps extends ComboBoxButtonElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxButtonElement>, ComboBoxButtonElement> {}
interface ComboBoxGroupProps extends ComboBoxGroupElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxGroupElement>, ComboBoxGroupElement> {}
interface ComboBoxInputProps extends ComboBoxInputElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxInputElement>, ComboBoxInputElement> {}
interface ComboBoxListProps extends ComboBoxListElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxListElement>, ComboBoxListElement> {}
interface ComboBoxListOptionProps
  extends ComboBoxListOptionElementAttributes,
    DetailedHTMLProps<HTMLAttributes<ComboBoxListOptionElement>, ComboBoxListOptionElement> {}

export function ComboBox() {
  const { element, ref } = useQueelagElement('queelag-combobox')
  const [props] = useState<ComboBoxProps>({})

  return (
    <div>
      <queelag-combobox {...props} ref={ref}></queelag-combobox>
    </div>
  )
}
