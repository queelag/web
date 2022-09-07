import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type {
  AlertDialogDescriptionElement,
  AlertDialogDescriptionElementAttributes,
  AlertDialogElement,
  AlertDialogElementAttributes,
  AlertDialogLabelElement,
  AlertDialogLabelElementAttributes
} from '../../../src'
import '../../../src/elements/alert.dialog.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-alert-dialog': AlertDialogProps
      'queelag-alert-dialog-description': AlertDialogDescriptionProps
      'queelag-alert-dialog-label': AlertDialogLabelProps
    }
  }
}

interface AlertDialogProps extends AlertDialogElementAttributes, DetailedHTMLProps<HTMLAttributes<AlertDialogElement>, AlertDialogElement> {}

interface AlertDialogDescriptionProps
  extends AlertDialogDescriptionElementAttributes,
    DetailedHTMLProps<HTMLAttributes<AlertDialogDescriptionElement>, AlertDialogLabelElement> {}

interface AlertDialogLabelProps
  extends AlertDialogLabelElementAttributes,
    DetailedHTMLProps<HTMLAttributes<AlertDialogLabelElement>, AlertDialogDescriptionElement> {}

export function AlertDialog() {
  const { element, ref } = useQueelagElement('queelag-alert-dialog')
  const [props] = useState<AlertDialogProps>({})

  return (
    <div>
      <queelag-alert-dialog {...props} ref={ref} {...element?.aria_attributes} className='w-64 rounded-sm border border-gray-300' description label>
        <h2 slot='label'>Alert Dialog</h2>
        <p slot='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </queelag-alert-dialog>
    </div>
  )
}
