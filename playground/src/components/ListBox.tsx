import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { joinElementClasses, ListBoxElement, ListBoxElementAttributes, ListBoxOptionElement, ListBoxOptionElementAttributes } from '../../../src'
import '../../../src/elements/list.box.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'q-listbox': ListBoxProps
      'q-listbox-option': ListBoxOptionProps
    }
  }
}

interface ListBoxProps extends ListBoxElementAttributes, DetailedHTMLProps<HTMLAttributes<ListBoxElement>, ListBoxElement> {}
interface ListBoxOptionProps extends ListBoxOptionElementAttributes, DetailedHTMLProps<HTMLAttributes<ListBoxOptionElement>, ListBoxOptionElement> {}

export function ListBox() {
  const { element, ref } = useQueelagElement('q-listbox')
  const [props] = useState<ListBoxProps>({})
  const [options] = useState<string[]>(['Lion', 'Giraffe', 'Zebra', 'Buffalo'])

  return (
    <div>
      <q-listbox
        {...props}
        ref={ref}
        className='w-64 flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400'
        // selection-follows-focus
        // select-first-option-on-focus
      >
        {options.map((option: string) => (
          <ListBoxOption key={option} name={option} />
        ))}
      </q-listbox>
    </div>
  )
}

export function ListBoxOption({ name }: any) {
  const { element, ref } = useQueelagElement('q-listbox-option', { attribute: { dispatch: true } })

  return (
    <q-listbox-option
      ref={ref}
      className={joinElementClasses(
        'flex justify-between items-center p-2 rounded-sm',
        element?.focused && 'ring-2 ring-offset-2 ring-blue-700',
        element?.selected && 'bg-gray-200'
      )}
    >
      <span className='text-xs'>{name}</span>
      {element?.selected && (
        <q-icon fill='none' size={16} src='https://raw.githubusercontent.com/feathericons/feather/master/icons/check.svg' stroke='black' stroke-width={1.5} />
      )}
    </q-listbox-option>
  )
}
