import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  DialogDescriptionElement,
  DialogDescriptionElementAttributes,
  DialogElement,
  DialogElementAttributes,
  DialogLabelElement,
  DialogLabelElementAttributes,
  joinElementClasses
} from '../../../src'
import '../../../src/elements/dialog.element'
import { useEventListener } from '../hooks/use.event.listener'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-dialog': DialogProps
      'queelag-dialog-description': DialogDescriptionProps
      'queelag-dialog-label': DialogLabelProps
    }
  }
}

interface DialogProps extends DialogElementAttributes, DetailedHTMLProps<HTMLAttributes<DialogElement>, DialogElement> {}
interface DialogDescriptionProps extends DialogDescriptionElementAttributes, DetailedHTMLProps<HTMLAttributes<DialogDescriptionElement>, DialogLabelElement> {}
interface DialogLabelProps extends DialogLabelElementAttributes, DetailedHTMLProps<HTMLAttributes<DialogLabelElement>, DialogDescriptionElement> {}

export function Dialog() {
  const { element, ref } = useQueelagElement('queelag-dialog')
  const [props] = useState<DialogProps>({})
  const [visible, setVisible] = useState<boolean>(false)

  const open = () => setVisible(true)
  const close = () => setVisible(false)

  useEventListener(ref, 'close', close)

  return (
    <div>
      <queelag-button onClick={open} native>
        Open Dialog
      </queelag-button>
      <queelag-dialog
        {...props}
        ref={ref}
        className={joinElementClasses('fixed z-40 w-64 flex flex-col gap-2 p-2 rounded-sm border border-gray-300 bg-white', !visible && 'hidden')}
        visible={visible}
      >
        <queelag-dialog-label>Dialog</queelag-dialog-label>
        <queelag-dialog-description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </queelag-dialog-description>
        <queelag-input placeholder='input inside dialog' type='text' />
        <div className='self-end flex gap-2'>
          <queelag-button onClick={close} native>
            Close
          </queelag-button>
          <queelag-button onClick={close} native>
            Ok
          </queelag-button>
        </div>
      </queelag-dialog>
    </div>
  )
}
