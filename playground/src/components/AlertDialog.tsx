import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  AlertDialogDescriptionElement,
  AlertDialogDescriptionElementAttributes,
  AlertDialogElement,
  AlertDialogElementAttributes,
  AlertDialogLabelElement,
  AlertDialogLabelElementAttributes,
  joinElementClasses
} from '../../../src'
import '../../../src/elements/alert.dialog.element'
import { useEventListener } from '../hooks/use.event.listener'
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
  const [visible, setVisible] = useState<boolean>(false)

  const open = () => setVisible(true)
  const close = () => setVisible(false)

  useEventListener(ref, 'close', close)

  return (
    <div>
      <queelag-button onClick={open} native>
        Open Alert Dialog
      </queelag-button>
      <queelag-alert-dialog
        {...props}
        ref={ref}
        className={joinElementClasses('fixed z-40 w-64 flex flex-col gap-2 p-2 rounded-sm border border-gray-300 bg-white', !visible && 'hidden')}
        visible={visible}
        has-description
        has-label
      >
        <queelag-alert-dialog-label>Alert Dialog</queelag-alert-dialog-label>
        <queelag-alert-dialog-description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </queelag-alert-dialog-description>
        <div className='self-end flex gap-2'>
          <queelag-button onClick={close} native>
            Close
          </queelag-button>
          <queelag-button onClick={close} native>
            Ok
          </queelag-button>
        </div>
      </queelag-alert-dialog>
    </div>
  )
}
