import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { AriaSwitchElement, AriaSwitchElementAttributes, joinElementClasses } from '../../../../src'
import '../../../../src/elements/aria/aria.switch.element'
import { useQueelagElement } from '../../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'q-aria-switch': AriaSwitchProps
    }
  }
}

interface AriaSwitchProps extends AriaSwitchElementAttributes, DetailedHTMLProps<HTMLAttributes<AriaSwitchElement>, AriaSwitchElement> {}

export function AriaSwitch() {
  const { element, ref } = useQueelagElement('q-aria-switch')
  const [props] = useState<AriaSwitchProps>({})

  return (
    <div className='flex'>
      <q-aria-switch {...props} ref={ref} className='w-16 h-8' native>
        <div className='w-full p-px border rounded-sm border-gray-400'>
          <div className={joinElementClasses('w-1/2 h-full', element?.on ? 'translate-x-full bg-green-700' : 'bg-red-700')} />
        </div>
      </q-aria-switch>
    </div>
  )
}
