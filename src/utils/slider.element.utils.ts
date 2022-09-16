import {
  DEFAULT_SLIDER_DECIMALS,
  DEFAULT_SLIDER_MAXIMUM,
  DEFAULT_SLIDER_MINIMUM,
  DEFAULT_SLIDER_ORIENTATION,
  DEFAULT_SLIDER_THUMB_VALUE
} from '@/definitions/constants'
import { Orientation } from '@/definitions/types'
import { getNumberPercentage, toFixedNumber } from '@queelag/core'

export function getAriaSliderThumbElementStyleLeft(percentage: number, orientation: Orientation = DEFAULT_SLIDER_ORIENTATION): string {
  if (orientation === 'horizontal') {
    return percentage + '%'
  }

  return '0'
}

export function getAriaSliderThumbElementStyleTop(percentage: number, orientation: Orientation = DEFAULT_SLIDER_ORIENTATION): string {
  if (orientation === 'vertical') {
    return percentage + '%'
  }

  return '0'
}

export function getAriaSliderThumbElementPercentage(
  value: number = DEFAULT_SLIDER_THUMB_VALUE,
  minimum: number = DEFAULT_SLIDER_MINIMUM,
  maximum: number = DEFAULT_SLIDER_MAXIMUM,
  decimals: number = DEFAULT_SLIDER_DECIMALS
): number {
  return toFixedNumber(getNumberPercentage(value, minimum, maximum), decimals)
}
