import { offset } from '@floating-ui/dom'
import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  joinElementClasses,
  TooltipArrowElement,
  TooltipArrowElementAttributes,
  TooltipContentElement,
  TooltipContentElementAttributes,
  TooltipElement,
  TooltipElementAttributes,
  TooltipTriggerElement,
  TooltipTriggerElementAttributes
} from '../../../src'
import '../../../src/elements/tooltip.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'q-tooltip': TooltipProps
      'q-tooltip-arrow': TooltipArrowProps
      'q-tooltip-content': TooltipContentProps
      'q-tooltip-trigger': TooltipTriggerProps
    }
  }
}

interface TooltipProps extends TooltipElementAttributes, DetailedHTMLProps<HTMLAttributes<TooltipElement>, TooltipElement> {}
interface TooltipArrowProps extends TooltipArrowElementAttributes, DetailedHTMLProps<HTMLAttributes<TooltipArrowElement>, TooltipArrowElement> {}
interface TooltipContentProps extends TooltipContentElementAttributes, DetailedHTMLProps<HTMLAttributes<TooltipContentElement>, TooltipContentElement> {}
interface TooltipTriggerProps extends TooltipTriggerElementAttributes, DetailedHTMLProps<HTMLAttributes<TooltipTriggerElement>, TooltipTriggerElement> {}

export function Tooltip() {
  const { element, ref } = useQueelagElement('q-tooltip', { attribute: { dispatch: true } })
  const [props] = useState<TooltipProps>({})

  return (
    <div>
      <q-tooltip {...props} ref={ref} focusable>
        <q-tooltip-content
          className={joinElementClasses('px-2 py-1 rounded-sm shadow bg-black', !element?.visible && 'opacity-0 pointer-events-none')}
          middlewares={[offset(8)]}
        >
          <span className='text-xs whitespace-nowrap text-white'>Tooltip Content</span>
          <q-tooltip-arrow className='h-0 w-0 border-x-[8px] border-x-transparent border-b-[8px] border-b-black' />
        </q-tooltip-content>
        <q-tooltip-trigger>
          <q-button className='whitespace-nowrap' tabIndex={-1} native>
            Tooltip Trigger
          </q-button>
        </q-tooltip-trigger>
      </q-tooltip>
    </div>
  )
}
