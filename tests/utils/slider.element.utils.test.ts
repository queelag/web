import { describe, expect, it } from 'vitest'
import { getSliderThumbElementPercentage, getSliderThumbElementStyleLeft, getSliderThumbElementStyleTop } from '../../src'

describe('SliderElementUtils', () => {
  it('gets thumb element styles', () => {
    expect(getSliderThumbElementStyleLeft(25)).toBe('25%')
    expect(getSliderThumbElementStyleTop(75)).toBe('0')
    expect(getSliderThumbElementStyleLeft(25, 'vertical')).toBe('0')
    expect(getSliderThumbElementStyleTop(75, 'vertical')).toBe('75%')
  })

  it('gets thumb element percentage', () => {
    expect(getSliderThumbElementPercentage()).toBe(0)
    expect(getSliderThumbElementPercentage(25, 0, 100, 0)).toBe(25)
  })
})
