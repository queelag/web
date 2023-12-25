import { getLimitedNumber, getNumberPercentage } from '@aracna/core'
import { DEFAULT_METER_MAX, DEFAULT_METER_MIN, DEFAULT_METER_VALUE } from '../definitions/constants.js'

export function getMeterElementPercentage(value?: number, min: number = DEFAULT_METER_MIN, max: number = DEFAULT_METER_MAX, round?: boolean): number {
  return getNumberPercentage(getMeterElementValue(value, min, max), { min, max, round })
}

export function getMeterElementValue(value?: number, min: number = DEFAULT_METER_MIN, max: number = DEFAULT_METER_MAX): number {
  return getLimitedNumber(value ?? DEFAULT_METER_VALUE, { min, max })
}
