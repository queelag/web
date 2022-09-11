import { offset } from '@floating-ui/dom'
import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
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
  ComboBoxOptionElement,
  ComboBoxOptionElementAttributes,
  joinElementClasses
} from '../../../src'
import '../../../src/elements/combo.box.element'
import { FRUITS } from '../definitions/constants'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-combobox': ComboBoxProps
      'queelag-combobox-button': ComboBoxButtonProps
      'queelag-combobox-group': ComboBoxGroupProps
      'queelag-combobox-input': ComboBoxInputProps
      'queelag-combobox-list': ComboBoxListProps
      'queelag-combobox-option': ComboBoxOptionProps
    }
  }
}

interface ComboBoxProps extends ComboBoxElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxElement>, ComboBoxElement> {}
interface ComboBoxButtonProps extends ComboBoxButtonElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxButtonElement>, ComboBoxButtonElement> {}
interface ComboBoxGroupProps extends ComboBoxGroupElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxGroupElement>, ComboBoxGroupElement> {}
interface ComboBoxInputProps extends ComboBoxInputElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxInputElement>, ComboBoxInputElement> {}
interface ComboBoxListProps extends ComboBoxListElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxListElement>, ComboBoxListElement> {}
interface ComboBoxOptionProps extends ComboBoxOptionElementAttributes, DetailedHTMLProps<HTMLAttributes<ComboBoxOptionElement>, ComboBoxOptionElement> {}

export function ComboBox() {
  const { element, ref } = useQueelagElement('queelag-combobox')
  const [props] = useState<ComboBoxProps>({})
  const [options] = useState<string[]>(FRUITS)

  return (
    <div>
      <queelag-combobox {...props} ref={ref} autocomplete='list' className='w-64'>
        <queelag-combobox-group className='w-full rounded-sm border border-gray-400'>
          {/* <queelag-combobox-input className='w-full'>
            <input className='appearance-none w-full h-8 px-2 text-xs' placeholder='Pick an animal (combobox)' type='text' />
          </queelag-combobox-input> */}
          <queelag-combobox-button className='w-full flex justify-between items-center p-2'>
            <span className='text-xs'>{element?.selectedOptionElement ? options[element.selectedOptionElementIndex] : 'Pick an animal (combobox)'}</span>
            <queelag-icon
              fill='none'
              size={16}
              src={
                element?.expanded
                  ? 'https://raw.githubusercontent.com/feathericons/feather/master/icons/chevron-up.svg'
                  : 'https://raw.githubusercontent.com/feathericons/feather/master/icons/chevron-down.svg'
              }
              stroke='black'
              stroke-width={2}
            />
          </queelag-combobox-button>
        </queelag-combobox-group>
        <queelag-combobox-list
          className={joinElementClasses(
            'max-h-64 flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400 bg-white',
            !element?.expanded && 'opacity-0 pointer-events-none'
          )}
          middlewares={[offset(4)]}
        >
          {options
            .filter((option: string) => option.toLowerCase().includes(element?.inputElement?.value.toLowerCase() || ''))
            .map((option: string) => (
              <ComboBoxOption key={option} option={option} />
            ))}
        </queelag-combobox-list>
      </queelag-combobox>
    </div>
  )
}

function ComboBoxOption({ option }: any) {
  const { element, ref } = useQueelagElement('queelag-combobox-option')

  return (
    <queelag-combobox-option
      ref={ref}
      className={joinElementClasses('flex justify-between items-center p-2 text-xs rounded-sm', element?.focused && 'ring-2 ring-offset-2 ring-blue-700')}
    >
      <span className='text-xs'>{option}</span>
      {element?.selected && (
        <queelag-icon
          fill='none'
          size={14}
          src='https://raw.githubusercontent.com/feathericons/feather/master/icons/check.svg'
          stroke='black'
          stroke-width={2}
        />
      )}
    </queelag-combobox-option>
  )
}
