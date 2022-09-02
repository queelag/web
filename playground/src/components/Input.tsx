import { useRef, useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { size, string } from 'superstruct'
import type { InputElement, InputElementAttributes } from '../../../src'
import '../../../src/elements/input.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-input': InputProps
    }
  }
}

interface InputProps extends InputElementAttributes, DetailedHTMLProps<HTMLAttributes<InputElement>, InputElement> {}

export function Input() {
  const { element, ref } = useQueelagElement('queelag-input')
  const [props] = useState<InputProps>({ type: 'text' })
  const target = useRef({ name: '' })

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <queelag-input
          {...props}
          path='name'
          target={target.current}
          ref={ref}
          placeholder='placeholder'
          schema={size(string(), 0, 5)}
          touch-trigger='change'
        />
        <queelag-button normalized>
          <queelag-icon
            fill='none'
            onClick={() => (element.obscured ? element.reveal() : element.obscure())}
            size={12}
            src={
              element.obscured
                ? 'https://raw.githubusercontent.com/feathericons/feather/master/icons/eye.svg'
                : 'https://raw.githubusercontent.com/feathericons/feather/master/icons/eye-off.svg'
            }
            stroke='black'
            stroke-width={2.5}
          />
        </queelag-button>
        <queelag-button normalized>
          <queelag-icon
            fill='none'
            onClick={() => element.clear()}
            size={16}
            src='https://raw.githubusercontent.com/feathericons/feather/master/icons/x.svg'
            stroke='black'
            stroke-width={2}
          />
        </queelag-button>
      </div>
      {element.isErrorVisible && <span className='text-xs text-red-500'>{element.error}</span>}
    </div>
  )
}
