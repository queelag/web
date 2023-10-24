import { getLimitedNumber, getNumberPercentage } from '@aracna/core'
import { DEFAULT_METER_MAX, DEFAULT_METER_MIN, DEFAULT_METER_VALUE } from '../definitions/constants.js'

export function getMeterElementPercentage(value?: number, min?: number, max?: number, round?: boolean): number {
  return getNumberPercentage(getMeterElementValue(value, min, max), min ?? DEFAULT_METER_MIN, max ?? DEFAULT_METER_MAX, round)
}

export function getMeterElementValue(value?: number, min?: number, max?: number): number {
  return getLimitedNumber(value ?? DEFAULT_METER_VALUE, min ?? DEFAULT_METER_MIN, max ?? DEFAULT_METER_MAX)
}
