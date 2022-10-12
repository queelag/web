import { getNumberPercentage, toFixedNumber } from '@queelag/core'
import {
  DEFAULT_SLIDER_DECIMALS,
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_MIN,
  DEFAULT_SLIDER_ORIENTATION,
  DEFAULT_SLIDER_THUMB_VALUE
} from '../definitions/constants'
import { Orientation } from '../definitions/types'

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
  min: number = DEFAULT_SLIDER_MIN,
  max: number = DEFAULT_SLIDER_MAX,
  decimals: number = DEFAULT_SLIDER_DECIMALS
): number {
  return toFixedNumber(getNumberPercentage(value, min, max), decimals)
}
