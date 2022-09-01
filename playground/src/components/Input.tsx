import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
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

  return (
    <div className='flex items-center gap-2'>
      <queelag-input {...props} ref={ref} placeholder='placeholder' type='buffer' obscured />
      <queelag-button normalized>
        <queelag-icon
          fill='none'
          onClick={() => (element.obscured ? element.reveal() : element.obscure())}
          size={16}
          src={
            element.obscured
              ? 'https://raw.githubusercontent.com/feathericons/feather/master/icons/eye.svg'
              : 'https://raw.githubusercontent.com/feathericons/feather/master/icons/eye-off.svg'
          }
          stroke='black'
          strokeWidth={2}
        />
      </queelag-button>
      <queelag-button normalized>
        <queelag-icon
          fill='none'
          onClick={() => element.clear()}
          size={16}
          src='https://raw.githubusercontent.com/feathericons/feather/master/icons/x.svg'
          stroke='black'
          strokeWidth={2}
        />
      </queelag-button>
    </div>
  )
}
