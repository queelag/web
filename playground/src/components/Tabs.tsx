import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  joinElementClasses,
  TabsElement,
  TabsElementAttributes,
  TabsPanelElement,
  TabsPanelElementAttributes,
  TabsTabElement,
  TabsTabElementAttributes
} from '../../../src'
import '../../../src/elements/tabs.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'q-tabs': TabsProps
      'q-tabs-panel': TabsPanelProps
      'q-tabs-tab': TabsTabProps
    }
  }
}

interface TabsProps extends TabsElementAttributes, DetailedHTMLProps<HTMLAttributes<TabsElement>, TabsElement> {}
interface TabsPanelProps extends TabsPanelElementAttributes, DetailedHTMLProps<HTMLAttributes<TabsPanelElement>, TabsPanelElement> {}
interface TabsTabProps extends TabsTabElementAttributes, DetailedHTMLProps<HTMLAttributes<TabsTabElement>, TabsTabElement> {}

export function Tabs() {
  const { element, ref } = useQueelagElement('q-tabs', { attribute: { dispatch: true } })
  const [props] = useState<TabsProps>({})
  const [tabs] = useState<number[]>([1, 2, 3])

  return (
    <div>
      <q-tabs {...props} ref={ref} className='flex flex-col items-start gap-2'>
        <div className='flex border divide-x border-gray-400 divide-gray-400'>
          {tabs.map((number: number) => (
            <TabsTab number={number} />
          ))}
        </div>
        <q-tabs-panel className='w-64 h-32 p-2 border border-gray-400'>
          <span className='text-xs'>Content of Tab {tabs[element?.selectedTabElementIndex || 0]}</span>
        </q-tabs-panel>
      </q-tabs>
    </div>
  )
}

export function TabsTab({ number }: any) {
  const { element, ref } = useQueelagElement('q-tabs-tab', { attribute: { dispatch: true } })

  return (
    <q-tabs-tab ref={ref} className={joinElementClasses('px-3 py-2', element?.selected && 'bg-gray-200')} selected={number === 1}>
      <span className='text-xs'>Tab {number}</span>
    </q-tabs-tab>
  )
}
