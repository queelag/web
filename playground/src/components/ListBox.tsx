import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { joinElementClasses, ListBoxElement, ListBoxElementAttributes, ListBoxOptionElement, ListBoxOptionElementAttributes } from '../../../src'
import '../../../src/elements/list.box.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-listbox': ListBoxProps
      'queelag-listbox-option': ListBoxOptionProps
    }
  }
}

interface ListBoxProps extends ListBoxElementAttributes, DetailedHTMLProps<HTMLAttributes<ListBoxElement>, ListBoxElement> {}
interface ListBoxOptionProps extends ListBoxOptionElementAttributes, DetailedHTMLProps<HTMLAttributes<ListBoxOptionElement>, ListBoxOptionElement> {}

export function ListBox() {
  const { element, ref } = useQueelagElement('queelag-listbox')
  const [props] = useState<ListBoxProps>({})
  const [options] = useState<string[]>(['Lion', 'Giraffe', 'Zebra', 'Buffalo'])

  return (
    <div>
      <queelag-listbox {...props} ref={ref} className='w-64 flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400'>
        {options.map((option: string) => (
          <ListBoxOption key={option} name={option} />
        ))}
      </queelag-listbox>
    </div>
  )
}

export function ListBoxOption({ name }: any) {
  const { element, ref } = useQueelagElement('queelag-listbox-option')

  return (
    <queelag-listbox-option
      ref={ref}
      className={joinElementClasses(
        'flex justify-between items-center p-2 rounded-sm',
        element?.focused && 'ring-2 ring-offset-2 ring-blue-700',
        element?.selected && 'bg-gray-200'
      )}
    >
      <span className='text-xs'>{name}</span>
      {element?.selected && (
        <queelag-icon
          fill='none'
          size={16}
          src='https://raw.githubusercontent.com/feathericons/feather/master/icons/check.svg'
          stroke='black'
          stroke-width={1.5}
        />
      )}
    </queelag-listbox-option>
  )
}
