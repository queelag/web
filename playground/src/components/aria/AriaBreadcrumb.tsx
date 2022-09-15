import { Fragment } from 'preact'
import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type {
  AriaBreadcrumbAnchorElement,
  AriaBreadcrumbAnchorElementAttributes,
  AriaBreadcrumbElement,
  AriaBreadcrumbElementAttributes,
  AriaBreadcrumbListElement,
  AriaBreadcrumbListElementAttributes,
  AriaBreadcrumbListItemElement,
  AriaBreadcrumbListItemElementAttributes
} from '../../../../src'
import '../../../../src/elements/aria/aria.breadcrumb.element'
import { useQueelagElement } from '../../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'q-aria-breadcrumb': AriaBreadcrumbProps
      'q-aria-breadcrumb-anchor': AriaBreadcrumbAnchorProps
      'q-aria-breadcrumb-list': AriaBreadcrumbListProps
      'q-aria-breadcrumb-list-item': AriaBreadcrumbListItemProps
    }
  }
}

interface AriaBreadcrumbProps extends AriaBreadcrumbElementAttributes, DetailedHTMLProps<HTMLAttributes<AriaBreadcrumbElement>, AriaBreadcrumbElement> {}

interface AriaBreadcrumbAnchorProps
  extends AriaBreadcrumbAnchorElementAttributes,
    DetailedHTMLProps<HTMLAttributes<AriaBreadcrumbAnchorElement>, AriaBreadcrumbAnchorElement> {}

interface AriaBreadcrumbListProps
  extends AriaBreadcrumbListElementAttributes,
    DetailedHTMLProps<HTMLAttributes<AriaBreadcrumbListElement>, AriaBreadcrumbListElement> {}

interface AriaBreadcrumbListItemProps
  extends AriaBreadcrumbListItemElementAttributes,
    DetailedHTMLProps<HTMLAttributes<AriaBreadcrumbListItemElement>, AriaBreadcrumbListItemElement> {}

export function AriaBreadcrumb() {
  const { element, ref } = useQueelagElement('q-aria-breadcrumb')
  const [props] = useState<AriaBreadcrumbProps>({})
  const [items] = useState<string[]>(['Home', 'Shop', 'Article'])

  return (
    <div>
      <q-aria-breadcrumb {...props} className='p-2 rounded-sm border border-gray-400' ref={ref}>
        <q-aria-breadcrumb-list className='flex items-center gap-2 text-xs'>
          {items.map((item: string, index: number) => (
            <Fragment>
              {index > 0 && <span>/</span>}
              <q-aria-breadcrumb-list-item>
                <q-aria-breadcrumb-anchor className='hover:underline' current={index >= items.length - 1} href='#' target='_blank'>
                  {item}
                </q-aria-breadcrumb-anchor>
              </q-aria-breadcrumb-list-item>
            </Fragment>
          ))}
        </q-aria-breadcrumb-list>
      </q-aria-breadcrumb>
    </div>
  )
}
