import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { ImageElement, ImageElementAttributes } from '../../../src'
import '../../../src/elements/image.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-image': ImageProps
    }
  }
}

interface ImageProps extends ImageElementAttributes, DetailedHTMLProps<HTMLAttributes<ImageElement>, ImageElement> {}

export function Image() {
  const { element, ref } = useQueelagElement('queelag-image')
  const [props] = useState<ImageProps>({ src: '' })

  return (
    <div>
      <queelag-image
        {...props}
        cache-options={{ type: 'image/jpeg', quality: 0 }}
        ref={ref}
        shape='squircle'
        size={128}
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
        cache
        eager
      />
      {/* <queelag-image
        {...props}
        ref={ref}
        size={128}
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
        cache
      /> */}
    </div>
  )
}
