import { getLowestNumber, getNumbersDistance } from '@queelag/core'
import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  getSliderThumbElementPercentage,
  getSliderThumbElementStyleLeft,
  getSliderThumbElementStyleTop,
  joinElementClasses,
  Orientation,
  SliderElement,
  SliderElementAttributes,
  SliderThumbElement,
  SliderThumbElementAttributes
} from '../../../src'
import '../../../src/elements/slider.element'
import type { SliderChangeEvent } from '../../../src/events/slider.change.event'
import { useEventListener } from '../hooks/use.event.listener'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-slider': SliderProps
      'queelag-slider-thumb': SliderThumbProps
    }
  }
}

interface SliderProps extends SliderElementAttributes, DetailedHTMLProps<HTMLAttributes<SliderElement>, SliderElement> {}
interface SliderThumbProps extends SliderThumbElementAttributes, DetailedHTMLProps<HTMLAttributes<SliderThumbElement>, SliderThumbElement> {}

export function Slider() {
  const { element, ref } = useQueelagElement('queelag-slider')
  const [props] = useState<SliderProps>({})
  const [orientation] = useState<Orientation>('horizontal')
  const [percentages, setPercentages] = useState<number[]>([25, 75])

  useEventListener(ref, 'slider-change', (event: SliderChangeEvent) => {
    setPercentages(event.detail.percentages)
  })

  return (
    <div>
      <queelag-slider
        {...props}
        ref={ref}
        className={joinElementClasses('relative flex justify-center items-center', element?.isOrientationVertical ? 'w-5 h-64' : 'w-64 h-5')}
        minimum-distance={20}
        orientation={orientation}
        disable-swap
      >
        <div className={joinElementClasses('rounded-sm bg-gray-200', element?.isOrientationVertical ? 'w-1 h-full' : 'w-full h-1')} />
        {element?.hasMultipleThumbs && (
          <div
            className={joinElementClasses('absolute bg-blue-200', element.isOrientationVertical ? 'w-1' : 'h-1')}
            style={
              element.isOrientationVertical
                ? {
                    height: getNumbersDistance(percentages[0], percentages[1]) + '%',
                    top: getLowestNumber(percentages) + '%'
                  }
                : {
                    left: getLowestNumber(percentages) + '%',
                    width: getNumbersDistance(percentages[0], percentages[1]) + '%'
                  }
            }
          />
        )}
        <SliderThumb orientation={orientation} value={25} />
        {/* <SliderThumb orientation={orientation} value={75} /> */}
      </queelag-slider>
    </div>
  )
}

function SliderThumb({ orientation, value }: any) {
  const { element, ref } = useQueelagElement('queelag-slider-thumb')
  const [percentage] = useState<number>(getSliderThumbElementPercentage(value))
  // const [percentage, setPercentage] = useState<number>(getSliderThumbElementPercentage(value))

  // useEventListener(ref, 'slider-thumb-move', (event: SliderThumbMoveEvent) => {
  //   setPercentage(event.detail.percentage)
  // })

  return (
    <queelag-slider-thumb
      background='#2563eb'
      className={joinElementClasses('w-5 h-5 outline-none rounded-full transition duration-200', 'hover:ring-4 focus:ring-4 active:ring-8 ring-blue-100')}
      default-value={value}
      ref={ref}
      shape='circle'
      size={20}
      style={{
        left: getSliderThumbElementStyleLeft(percentage, orientation),
        top: getSliderThumbElementStyleTop(percentage, orientation)
      }}
      // disable-compute-position
      // value={value}
    />
  )
}
