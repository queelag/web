import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  AccordionElement,
  AccordionElementAttributes,
  AccordionHeaderButtonElement,
  AccordionHeaderButtonElementAttributes,
  AccordionHeaderElement,
  AccordionHeaderElementAttributes,
  AccordionPanelElement,
  AccordionPanelElementAttributes,
  AccordionSectionElement,
  AccordionSectionElementAttributes,
  joinElementClasses
} from '../../../src'
import '../../../src/elements/accordion.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-accordion': AccordionProps
      'queelag-accordion-header': AccordionHeaderProps
      'queelag-accordion-header-button': AccordionHeaderButtonProps
      'queelag-accordion-panel': AccordionPanelProps
      'queelag-accordion-section': AccordionSectionProps
    }
  }
}

interface AccordionProps extends AccordionElementAttributes, DetailedHTMLProps<HTMLAttributes<AccordionElement>, AccordionElement> {}
interface AccordionHeaderProps extends AccordionHeaderElementAttributes, DetailedHTMLProps<HTMLAttributes<AccordionHeaderElement>, AccordionHeaderElement> {}
interface AccordionHeaderButtonProps
  extends AccordionHeaderButtonElementAttributes,
    DetailedHTMLProps<HTMLAttributes<AccordionHeaderButtonElement>, AccordionHeaderButtonElement> {}
interface AccordionPanelProps extends AccordionPanelElementAttributes, DetailedHTMLProps<HTMLAttributes<AccordionPanelElement>, AccordionPanelElement> {}
interface AccordionSectionProps
  extends AccordionSectionElementAttributes,
    DetailedHTMLProps<HTMLAttributes<AccordionSectionElement>, AccordionSectionElement> {}

export function Accordion() {
  const { element, ref } = useQueelagElement('queelag-accordion')
  const [props] = useState<AccordionProps>({})
  const [sections] = useState<number[]>([1, 2])

  return (
    <div>
      <queelag-accordion {...props} ref={ref} className='w-64 flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400'>
        {sections.map((section: number) => (
          <AccordionSection number={section} />
        ))}
      </queelag-accordion>
    </div>
  )
}

function AccordionSection({ number }: any) {
  const { element, ref } = useQueelagElement('queelag-accordion-section')
  const [props] = useState<AccordionSectionProps>({})

  return (
    <queelag-accordion-section {...props} ref={ref} className='group flex flex-col py-2 gap-1 text-xs focus:outline' collapsable={number === 1}>
      <queelag-accordion-header>
        <queelag-accordion-header-button className='w-full flex justify-between items-center px-2'>
          <span>Accordion Header {number}</span>
          <queelag-icon
            fill='none'
            size={24}
            src={`https://raw.githubusercontent.com/feathericons/feather/master/icons/chevron-${element?.expanded ? 'up' : 'down'}.svg`}
            stroke='black'
            stroke-width={1.5}
          />
        </queelag-accordion-header-button>
      </queelag-accordion-header>
      <queelag-accordion-panel className={joinElementClasses('px-2 pt-2 border-t text-gray-400', !element?.expanded && 'hidden')}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </queelag-accordion-panel>
    </queelag-accordion-section>
  )
}
