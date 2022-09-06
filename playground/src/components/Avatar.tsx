import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { AvatarElement, AvatarElementAttributes } from '../../../src'
import '../../../src/elements/avatar.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-avatar': AvatarProps
    }
  }
}

interface AvatarProps extends AvatarElementAttributes, DetailedHTMLProps<HTMLAttributes<AvatarElement>, AvatarElement> {}

export function Avatar() {
  const { element, ref } = useQueelagElement('queelag-avatar')
  const [props] = useState<AvatarProps>({})

  return (
    <div className='flex gap-2'>
      <queelag-avatar {...props} background='lightgray' ref={ref} shape='circle' size={32}>
        <span className='text-xs'>DS</span>
      </queelag-avatar>
      <queelag-avatar {...props} background='lightblue' ref={ref} shape='circle' size={32}>
        <queelag-icon
          fill='none'
          size={16}
          src='https://raw.githubusercontent.com/feathericons/feather/master/icons/user.svg'
          stroke='white'
          stroke-width={2}
        />
      </queelag-avatar>
      <queelag-avatar {...props} background='lightgray' ref={ref} shape='circle' size={32}>
        <queelag-image src='https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg' lazy />
      </queelag-avatar>
    </div>
  )
}
