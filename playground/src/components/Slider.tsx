import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { joinElementClasses, SliderElement, SliderElementAttributes, SliderThumbElement, SliderThumbElementAttributes } from '../../../src'
import '../../../src/elements/slider.element'
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

  return (
    <div>
      <queelag-slider
        {...props}
        ref={ref}
        className={joinElementClasses('relative flex justify-center items-center', element?.isOrientationVertical ? 'w-6 h-64' : 'w-64 h-6')}
        // orientation='vertical'
      >
        <div className={joinElementClasses('rounded-sm bg-gray-200', element?.isOrientationVertical ? 'w-1 h-full' : 'w-full h-1')} />
        {/* {element?.hasMultipleThumbs && (
          <div
            className={joinElementClasses('absolute bg-blue-700', element.isOrientationVertical ? 'w-1' : 'h-1')}
            style={
              element.isOrientationVertical
                ? {
                    bottom: getLowestNumber(element.value || []),
                    height: getNumbersDistance(element.value[0], element.value[1]) + '%'
                  }
                : {
                    left: getLowestNumber(element.value || []),
                    width: getNumbersDistance(element.value[0], element.value[1]) + '%'
                  }
            }
          />
        )} */}
        <SliderThumb value={25} />
        <SliderThumb value={75} />
      </queelag-slider>
    </div>
  )
}

function SliderThumb({ value }: any) {
  //   const { element, ref } = useQueelagElement('queelag-slider-thumb')

  return (
    <queelag-slider-thumb
      background='blue'
      className={joinElementClasses('w-6 h-6 outline-none rounded-full', 'ring-offset-1 focus:ring-2 ring-blue-700')}
      //   ref={ref}
      shape='circle'
      size={24}
      //   style={{ left: element?.percentage + '%', top: 0 }}
      value={value}
    />
  )
}
