import { sleep } from '@queelag/core'
import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { ButtonElement, ButtonElementAttributes } from '../../../src'
import '../../../src/elements/button.element'
import { useQueelagElement } from '../hooks/use.queelag.element'
import './Button.css'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-button': ButtonProps
    }
  }
}

interface ButtonProps extends ButtonElementAttributes, DetailedHTMLProps<HTMLAttributes<ButtonElement>, ButtonElement> {}

export function Button() {
  const { element, ref } = useQueelagElement('queelag-button')
  const [props] = useState<ButtonProps>({})

  const onClick = async (event: PointerEvent) => {
    await sleep(1000)
  }

  return (
    <div>
      <queelag-button {...props} ref={ref} _onClick={onClick}>
        {element.spinning ? 'Spinning' : 'Button'}
      </queelag-button>
    </div>
  )
}
