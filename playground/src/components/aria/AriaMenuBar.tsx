import { offset } from '@floating-ui/dom'
import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  AriaMenuBarElement,
  AriaMenuBarElementAttributes,
  AriaMenuBarItemElement,
  AriaMenuBarItemElementAttributes,
  AriaMenuBarSubMenuElement,
  AriaMenuBarSubMenuElementAttributes,
  joinElementClasses
} from '../../../../src'
import '../../../../src/elements/aria/aria.menu.bar.element'
import { useQueelagElement } from '../../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'q-aria-menubar': AriaMenuBarProps
      'q-aria-menubar-item': AriaMenuBarItemProps
      'q-aria-menubar-submenu': AriaMenuBarSubMenuProps
    }
  }
}

interface AriaMenuBarProps extends AriaMenuBarElementAttributes, DetailedHTMLProps<HTMLAttributes<AriaMenuBarElement>, AriaMenuBarElement> {}

interface AriaMenuBarItemProps extends AriaMenuBarItemElementAttributes, DetailedHTMLProps<HTMLAttributes<AriaMenuBarItemElement>, AriaMenuBarItemElement> {}

interface AriaMenuBarSubMenuProps
  extends AriaMenuBarSubMenuElementAttributes,
    DetailedHTMLProps<HTMLAttributes<AriaMenuBarSubMenuElement>, AriaMenuBarSubMenuElement> {}

interface Item {
  children?: Item[]
  label: string
}

export function AriaMenuBar() {
  const { element, ref } = useQueelagElement('q-aria-menubar')
  const [props] = useState<AriaMenuBarProps>({})
  const [items] = useState<Item[]>([
    { label: 'Home' },
    {
      label: 'About',
      children: [
        { label: 'Overview' },
        { label: 'Administration' },
        { label: 'Facts', children: [{ label: 'History' }, { label: 'Current Statistics' }, { label: 'Awards' }] },
        { label: 'Campus Tours', children: [{ label: 'For prospective students' }, { label: 'For alumni' }, { label: 'For visitors' }] }
      ]
    },
    { label: 'Admissions', children: [{ label: 'Apply' }, { label: 'Tuition' }] }
  ])

  return (
    <div>
      <q-aria-menubar {...props} ref={ref} className='flex rounded-sm border border-gray-400'>
        {items.map((item: Item) => (
          <AriaMenuBarItem item={item} />
        ))}
      </q-aria-menubar>
    </div>
  )
}

function AriaMenuBarItem({ item }: any) {
  const { element, ref } = useQueelagElement('q-aria-menubar-item', { attribute: { dispatch: true } })

  return (
    <q-aria-menubar-item ref={ref}>
      <a className='p-2 text-xs' href='#'>
        {item.label}
      </a>
      {item.children && (
        <q-aria-menubar-submenu
          className={joinElementClasses(
            'w-48 flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400 bg-white',
            !element?.expanded && 'opacity-0 pointer-events-none'
          )}
          middlewares={[offset(0)]}
          placement={element?.deep ? 'right-start' : 'bottom-start'}
        >
          {item.children.map((child: Item) => (
            <AriaMenuBarItem item={child} />
          ))}
        </q-aria-menubar-submenu>
      )}
    </q-aria-menubar-item>
  )
}
