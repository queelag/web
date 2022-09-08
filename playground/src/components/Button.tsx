import { sleep } from '@queelag/core'
import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { ButtonElement, ButtonElementAttributes } from '../../../src'
import '../../../src/elements/button.element'
import type { ClickAsyncEvent } from '../../../src/events/click.async.event'
import { useEventListener } from '../hooks/use.event.listener'
import { useQueelagElement } from '../hooks/use.queelag.element'

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

  useEventListener(ref, 'clickasync', async (event: ClickAsyncEvent) => {
    await sleep(1000)
    event.detail.finalize()
  })

  return (
    <div>
      <queelag-button {...props} ref={ref} async native>
        <span>{element?.spinning ? 'Spinning' : 'Button'}</span>
      </queelag-button>
    </div>
  )
}
