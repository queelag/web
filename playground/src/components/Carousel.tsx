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
      'q-carousel': CarouselProps
      'q-carousel-next-slide-control': CarouselNextSlideControlProps
      'q-carousel-previous-slide-control': CarouselPreviousSlideControlProps
      'q-carousel-rotation-control': CarouselRotationControlProps
      'q-carousel-slide': CarouselSlideProps
      'q-carousel-slides': CarouselSlidesProps
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
  const { element, ref } = useQueelagElement('q-carousel', { attribute: { dispatch: true } })
  const [props] = useState<CarouselProps>({})
  const [slides] = useState<string[]>([
    'https://images.unsplash.com/photo-1533883355737-25ab4d1fbefb',
    'https://images.unsplash.com/photo-1462688681110-15bc88b1497c',
    'https://images.unsplash.com/photo-1571774367564-5037461020a3'
  ])

  return (
    <div>
      <q-carousel
        {...props}
        ref={ref}
        className='relative w-96 aspect-video'
        automatic-rotation-interval-time={2000}
        // automatic-rotation
        infinite-rotation
        //
      >
        <q-carousel-slides className='relative w-full rounded-sm overflow-hidden'>
          {slides.map((slide: string, index: number) => (
            <CarouselSlide index={index} slide={slide} />
          ))}
        </q-carousel-slides>
        <div className='absolute bottom-0 right-0 flex p-1 gap-2 text-xs'>
          <q-carousel-rotation-control className='px-2 py-1 rounded-sm bg-black'>
            <span className='uppercase text-white'>{element?.automaticRotation ? 'Stop' : 'Start'}</span>
          </q-carousel-rotation-control>
          <q-carousel-previous-slide-control className='px-2 py-1 rounded-sm bg-black'>
            <span className='uppercase text-white'>Prev</span>
          </q-carousel-previous-slide-control>
          <q-carousel-next-slide-control className='px-2 py-1 rounded-sm bg-black'>
            <span className='uppercase text-white'>Next</span>
          </q-carousel-next-slide-control>
        </div>
      </q-carousel>
    </div>
  )
}

function CarouselSlide({ index, slide }: any) {
  const { element, ref } = useQueelagElement('q-carousel-slide', { attribute: { dispatch: true } })

  return (
    <q-carousel-slide ref={ref} active={index <= 0} className={joinElementClasses('absolute inset-0', !element?.active && 'hidden')}>
      <q-image className='w-full' src={slide + '?w=768'} />
    </q-carousel-slide>
  )
}
