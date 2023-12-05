import { describe, expect, it } from 'vitest'
import { isStringSVG } from '../../src'

describe('String Utils', () => {
  it('checks if string is an svg', () => {
    expect(isStringSVG('hello')).toBeFalsy()
    expect(isStringSVG('<svg></svg>')).toBeTruthy()
  })
})
