import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { BadgeElement, BadgeElementAttributes } from '../../../src'
import '../../../src/elements/badge.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-badge': BadgeProps
    }
  }
}

interface BadgeProps extends BadgeElementAttributes, DetailedHTMLProps<HTMLAttributes<BadgeElement>, BadgeElement> {}

export function Badge() {
  const { element, ref } = useQueelagElement('queelag-badge')
  const [props] = useState<BadgeProps>({})

  return (
    <div className='flex'>
      <div className='relative'>
        <queelag-avatar background='lightgray' shape='squircle' size={32}>
          <span className='text-xs'>JD</span>
        </queelag-avatar>
        <queelag-badge {...props} ref={ref} background='red' className='absolute -top-0.5 -right-0.5' shape='circle' size={12} value={7}>
          <span className='text-white' style={{ fontSize: 8 }}>
            {element.value}
          </span>
        </queelag-badge>
      </div>
    </div>
  )
}
