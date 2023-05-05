import { getNumberPercentage, toFixedNumber } from '@aracna/core'
import {
  DEFAULT_SLIDER_DECIMALS,
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_MIN,
  DEFAULT_SLIDER_ORIENTATION,
  DEFAULT_SLIDER_THUMB_VALUE
} from '../definitions/constants.js'
import { Orientation } from '../definitions/types.js'

export function getSliderThumbElementStyleLeft(percentage: number, orientation: Orientation = DEFAULT_SLIDER_ORIENTATION): string {
  if (orientation === 'horizontal') {
    return percentage + '%'
  }

  return '0'
}

export function getSliderThumbElementStyleTop(percentage: number, orientation: Orientation = DEFAULT_SLIDER_ORIENTATION): string {
  if (orientation === 'vertical') {
    return percentage + '%'
  }

  return '0'
}

export function getSliderThumbElementPercentage(
  value: number = DEFAULT_SLIDER_THUMB_VALUE,
  min: number = DEFAULT_SLIDER_MIN,
  max: number = DEFAULT_SLIDER_MAX,
  decimals: number = DEFAULT_SLIDER_DECIMALS
): number {
  return toFixedNumber(getNumberPercentage(value, min, max), decimals)
}
