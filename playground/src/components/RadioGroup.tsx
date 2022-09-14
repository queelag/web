import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { joinElementClasses, RadioButtonElement, RadioButtonElementAttributes, RadioGroupElement, RadioGroupElementAttributes } from '../../../src'
import '../../../src/elements/radio.group.element'
import { FRUITS } from '../definitions/constants'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'q-radio-button': RadioButtonProps
      'q-radio-group': RadioGroupProps
    }
  }
}

interface RadioButtonProps extends RadioButtonElementAttributes, DetailedHTMLProps<HTMLAttributes<RadioButtonElement>, RadioButtonElement> {}
interface RadioGroupProps extends RadioGroupElementAttributes, DetailedHTMLProps<HTMLAttributes<RadioGroupElement>, RadioGroupElement> {}

export function RadioGroup() {
  const { element, ref } = useQueelagElement('q-radio-group')
  const [props] = useState<RadioGroupProps>({})
  const [options] = useState<string[]>(FRUITS.slice(4, 7))

  return (
    <div>
      <q-radio-group {...props} ref={ref} className='w-32 flex flex-col gap-1 outline-none'>
        {options.map((option: string) => (
          <RadioButton option={option} />
        ))}
      </q-radio-group>
    </div>
  )
}

export function RadioButton({ option }: any) {
  const { element, ref } = useQueelagElement('q-radio-button', { attribute: { dispatch: true } })

  return (
    <q-radio-button
      ref={ref}
      className={joinElementClasses(
        'flex items-center gap-2 p-2 rounded-sm border border-gray-400',
        element?.checked && '',
        element?.focused && 'ring-2 ring-offset-1 ring-blue-700'
      )}
    >
      <q-icon
        fill='none'
        size={14}
        src={
          element?.checked
            ? 'https://raw.githubusercontent.com/feathericons/feather/master/icons/disc.svg'
            : 'https://raw.githubusercontent.com/feathericons/feather/master/icons/circle.svg'
        }
        stroke='black'
        stroke-width={2}
      />
      <span className='text-xs'>{option}</span>
    </q-radio-button>
  )
}
