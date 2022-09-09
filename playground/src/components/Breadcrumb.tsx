import { Fragment } from 'preact'
import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type {
  BreadcrumbAnchorElement,
  BreadcrumbAnchorElementAttributes,
  BreadcrumbElement,
  BreadcrumbElementAttributes,
  BreadcrumbListElement,
  BreadcrumbListElementAttributes,
  BreadcrumbListItemElement,
  BreadcrumbListItemElementAttributes
} from '../../../src'
import '../../../src/elements/breadcrumb.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-breadcrumb': BreadcrumbProps
      'queelag-breadcrumb-anchor': BreadcrumbAnchorProps
      'queelag-breadcrumb-list': BreadcrumbListProps
      'queelag-breadcrumb-list-item': BreadcrumbListItemProps
    }
  }
}

interface BreadcrumbProps extends BreadcrumbElementAttributes, DetailedHTMLProps<HTMLAttributes<BreadcrumbElement>, BreadcrumbElement> {}
interface BreadcrumbAnchorProps
  extends BreadcrumbAnchorElementAttributes,
    DetailedHTMLProps<HTMLAttributes<BreadcrumbAnchorElement>, BreadcrumbAnchorElement> {}
interface BreadcrumbListProps extends BreadcrumbListElementAttributes, DetailedHTMLProps<HTMLAttributes<BreadcrumbListElement>, BreadcrumbListElement> {}
interface BreadcrumbListItemProps
  extends BreadcrumbListItemElementAttributes,
    DetailedHTMLProps<HTMLAttributes<BreadcrumbListItemElement>, BreadcrumbListItemElement> {}

export function Breadcrumb() {
  const { element, ref } = useQueelagElement('queelag-breadcrumb')
  const [props] = useState<BreadcrumbProps>({})
  const [items] = useState<string[]>(['Home', 'Shop', 'Article'])

  return (
    <div>
      <queelag-breadcrumb {...props} className='p-2 rounded-sm border border-gray-400' ref={ref}>
        <queelag-breadcrumb-list className='flex items-center gap-2 text-xs'>
          {items.map((item: string, index: number) => (
            <Fragment>
              {index > 0 && <span>/</span>}
              <queelag-breadcrumb-list-item>
                <queelag-breadcrumb-anchor className='hover:underline' current={index >= items.length - 1} href='#' target='_blank'>
                  {item}
                </queelag-breadcrumb-anchor>
              </queelag-breadcrumb-list-item>
            </Fragment>
          ))}
        </queelag-breadcrumb-list>
      </queelag-breadcrumb>
    </div>
  )
}
