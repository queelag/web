import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { CheckBoxElement, CheckBoxElementAttributes } from '../../../src'
import '../../../src/elements/check.box.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-checkbox': CheckBoxProps
    }
  }
}

interface CheckBoxProps extends CheckBoxElementAttributes, DetailedHTMLProps<HTMLAttributes<CheckBoxElement>, CheckBoxElement> {}

export function CheckBox() {
  const { element, ref } = useQueelagElement('queelag-checkbox')
  const [props] = useState<CheckBoxProps>({})

  return (
    <div className='flex items-center gap-2'>
      <queelag-checkbox {...props} ref={ref} native normalized>
        <div className='w-8 h-8 flex justify-center items-center rounded border border-gray-200'>
          {element?.checked && (
            <queelag-icon
              fill='none'
              size={16}
              src='https://raw.githubusercontent.com/feathericons/feather/master/icons/check.svg'
              stroke='black'
              stroke-width={2}
            />
          )}
        </div>
      </queelag-checkbox>
    </div>
  )
}
