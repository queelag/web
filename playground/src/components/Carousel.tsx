import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  CarouselElement,
  CarouselElementAttributes,
  CarouselNextSlideControlElement,
  CarouselNextSlideControlElementAttributes,
  CarouselPreviousSlideControlElement,
  CarouselPreviousSlideControlElementAttributes,
  CarouselRotationControlElement,
  CarouselRotationControlElementAttributes,
  CarouselSlideElement,
  CarouselSlideElementAttributes,
  CarouselSlidesElement,
  CarouselSlidesElementAttributes,
  joinElementClasses
} from '../../../src'
import '../../../src/elements/carousel.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-carousel': CarouselProps
      'queelag-carousel-next-slide-control': CarouselNextSlideControlProps
      'queelag-carousel-previous-slide-control': CarouselPreviousSlideControlProps
      'queelag-carousel-rotation-control': CarouselRotationControlProps
      'queelag-carousel-slide': CarouselSlideProps
      'queelag-carousel-slides': CarouselSlidesProps
    }
  }
}

interface CarouselProps extends CarouselElementAttributes, DetailedHTMLProps<HTMLAttributes<CarouselElement>, CarouselElement> {}

interface CarouselNextSlideControlProps
  extends CarouselNextSlideControlElementAttributes,
    DetailedHTMLProps<HTMLAttributes<CarouselNextSlideControlElement>, CarouselNextSlideControlElement> {}

interface CarouselPreviousSlideControlProps
  extends CarouselPreviousSlideControlElementAttributes,
    DetailedHTMLProps<HTMLAttributes<CarouselPreviousSlideControlElement>, CarouselPreviousSlideControlElement> {}

interface CarouselRotationControlProps
  extends CarouselRotationControlElementAttributes,
    DetailedHTMLProps<HTMLAttributes<CarouselRotationControlElement>, CarouselRotationControlElement> {}

interface CarouselSlideProps extends CarouselSlideElementAttributes, DetailedHTMLProps<HTMLAttributes<CarouselSlideElement>, CarouselSlideElement> {}
interface CarouselSlidesProps extends CarouselSlidesElementAttributes, DetailedHTMLProps<HTMLAttributes<CarouselSlidesElement>, CarouselSlidesElement> {}

export function Carousel() {
  const { element, ref } = useQueelagElement('queelag-carousel')
  const [props] = useState<CarouselProps>({})
  const [slides] = useState<string[]>([
    'https://images.unsplash.com/photo-1533883355737-25ab4d1fbefb',
    'https://images.unsplash.com/photo-1462688681110-15bc88b1497c',
    'https://images.unsplash.com/photo-1571774367564-5037461020a3'
  ])

  return (
    <div>
      <queelag-carousel {...props} ref={ref} className='w-96 aspect-video' automatic-rotation infinite-rotation>
        <queelag-carousel-slides className='relative w-full rounded-sm overflow-hidden'>
          {slides.map((slide: string) => (
            <CarouselSlide slide={slide} />
          ))}
        </queelag-carousel-slides>
      </queelag-carousel>
    </div>
  )
}

function CarouselSlide({ slide }: any) {
  const { element, ref } = useQueelagElement('queelag-carousel-slide', { attribute: { dispatch: true } })

  return (
    <queelag-carousel-slide ref={ref} className={joinElementClasses('absolute inset-0', !element?.active && 'hidden')}>
      <queelag-image className='w-full' src={slide + '?w=768'} />
    </queelag-carousel-slide>
  )
}
