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
  ComboBoxListOptionElement,
  ComboBoxListOptionElementAttributes,
  joinElementClasses
} from '../../../src'
import '../../../src/elements/combo.box.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-combobox': ComboBoxProps
      'queelag-combobox-button': ComboBoxButtonProps
      'queelag-combobox-group': ComboBoxGroupProps
      'queelag-combobox-input': ComboBoxInputProps
      'queelag-combobox-list': ComboBoxListProps
      'queelag-combobox-list-option': ComboBoxListOptionProps
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
  const [options] = useState<string[]>(['Lion', 'Giraffe', 'Zebra', 'Buffalo'])

  return (
    <div>
      <queelag-combobox {...props} ref={ref} className='w-64'>
        <queelag-combobox-group className='w-full rounded-sm border border-gray-400'>
          <queelag-combobox-button className='w-full flex justify-between items-center p-2'>
            <span className='text-xs'>
              {element?.selectedListOptionElement ? options[element.selectedListOptionElementIndex] : 'Pick an animal (combobox)'}
            </span>
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
            'flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400 bg-white',
            !element?.expanded && 'opacity-0 pointer-events-none'
          )}
          middlewares={[offset(4)]}
        >
          {options.map((option: string) => (
            <ComboBoxListOption key={option} option={option} />
          ))}
        </queelag-combobox-list>
      </queelag-combobox>
    </div>
  )
}

function ComboBoxListOption({ option }: any) {
  const { element, ref } = useQueelagElement('queelag-combobox-list-option')

  return (
    <queelag-combobox-list-option
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
    </queelag-combobox-list-option>
  )
}
