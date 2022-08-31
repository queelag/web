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
    <div>
      <queelag-input {...props} ref={ref} />
    </div>
  )
}
