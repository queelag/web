import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  DisclosureButtonElement,
  DisclosureButtonElementAttributes,
  DisclosureElement,
  DisclosureElementAttributes,
  DisclosurePanelElement,
  DisclosurePanelElementAttributes,
  DisclosureSectionElement,
  DisclosureSectionElementAttributes,
  joinElementClasses
} from '../../../src'
import '../../../src/elements/disclosure.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'q-disclosure': DisclosureProps
      'q-disclosure-button': DisclosureButtonProps
      'q-disclosure-panel': DisclosurePanelProps
      'q-disclosure-section': DisclosureSectionProps
    }
  }
}

interface DisclosureProps extends DisclosureElementAttributes, DetailedHTMLProps<HTMLAttributes<DisclosureElement>, DisclosureElement> {}
interface DisclosureButtonProps
  extends DisclosureButtonElementAttributes,
    DetailedHTMLProps<HTMLAttributes<DisclosureButtonElement>, DisclosureButtonElement> {}
interface DisclosurePanelProps extends DisclosurePanelElementAttributes, DetailedHTMLProps<HTMLAttributes<DisclosurePanelElement>, DisclosurePanelElement> {}
interface DisclosureSectionProps
  extends DisclosureSectionElementAttributes,
    DetailedHTMLProps<HTMLAttributes<DisclosureSectionElement>, DisclosureSectionElement> {}

export function Disclosure() {
  const { element, ref } = useQueelagElement('q-disclosure')
  const [props] = useState<DisclosureProps>({})
  const [sections] = useState<number[]>([1, 2, 3])

  return (
    <div>
      <q-disclosure
        {...props}
        ref={ref}
        allow-only-one-expanded-section
        className='w-64 flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400'
      >
        {sections.map((section: number) => (
          <DisclosureSection number={section} />
        ))}
      </q-disclosure>
    </div>
  )
}

function DisclosureSection({ number }: any) {
  const { element, ref } = useQueelagElement('q-disclosure-section', { attribute: { dispatch: true } })
  const [props] = useState<DisclosureSectionProps>({})

  return (
    <q-disclosure-section {...props} ref={ref} className='group flex flex-col py-2 gap-1 text-xs focus:outline'>
      <q-disclosure-button className='w-full flex justify-between items-center px-2'>
        <span>Disclosure Header {number}</span>
        <q-icon
          fill='none'
          size={16}
          src={`https://raw.githubusercontent.com/feathericons/feather/master/icons/chevron-${element?.expanded ? 'up' : 'down'}.svg`}
          stroke='black'
          stroke-width={2}
        />
      </q-disclosure-button>
      <q-disclosure-panel className={joinElementClasses('px-2 pt-2 border-t text-gray-400', !element?.expanded && 'hidden')}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </q-disclosure-panel>
    </q-disclosure-section>
  )
}
