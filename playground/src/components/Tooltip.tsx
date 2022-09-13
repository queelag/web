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
      'queelag-tooltip': TooltipProps
      'queelag-tooltip-arrow': TooltipArrowProps
      'queelag-tooltip-content': TooltipContentProps
      'queelag-tooltip-trigger': TooltipTriggerProps
    }
  }
}

interface TooltipProps extends TooltipElementAttributes, DetailedHTMLProps<HTMLAttributes<TooltipElement>, TooltipElement> {}
interface TooltipArrowProps extends TooltipArrowElementAttributes, DetailedHTMLProps<HTMLAttributes<TooltipArrowElement>, TooltipArrowElement> {}
interface TooltipContentProps extends TooltipContentElementAttributes, DetailedHTMLProps<HTMLAttributes<TooltipContentElement>, TooltipContentElement> {}
interface TooltipTriggerProps extends TooltipTriggerElementAttributes, DetailedHTMLProps<HTMLAttributes<TooltipTriggerElement>, TooltipTriggerElement> {}

export function Tooltip() {
  const { element, ref } = useQueelagElement('queelag-tooltip', { attribute: { dispatch: true } })
  const [props] = useState<TooltipProps>({})

  return (
    <div>
      <queelag-tooltip {...props} ref={ref} focusable>
        <queelag-tooltip-content
          className={joinElementClasses('px-2 py-1 rounded-sm shadow bg-black', !element?.visible && 'opacity-0 pointer-events-none')}
          middlewares={[offset(8)]}
        >
          <span className='text-xs whitespace-nowrap text-white'>Tooltip Content</span>
          <queelag-tooltip-arrow className='h-0 w-0 border-x-[8px] border-x-transparent border-b-[8px] border-b-black' />
        </queelag-tooltip-content>
        <queelag-tooltip-trigger>
          <queelag-button className='whitespace-nowrap' tabIndex={-1} native>
            Tooltip Trigger
          </queelag-button>
        </queelag-tooltip-trigger>
      </queelag-tooltip>
    </div>
  )
}
