import { DEFAULT_SLIDER_THUMB_VALUE } from '@/definitions/constants'

interface Detail {
  percentage: number
  value: number
}

export class AriaSliderThumbMoveEvent extends CustomEvent<Detail> {
  constructor(value: number | undefined, percentage: number) {
    super('slider-thumb-move', { detail: { percentage, value: value ?? DEFAULT_SLIDER_THUMB_VALUE } })
  }
}
