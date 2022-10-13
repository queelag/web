import { describe, expect, it } from 'vitest'
import { isStringSVG } from '../../src'

describe('StringUtils', () => {
  it('checks if string is an svg', () => {
    expect(isStringSVG('hello')).toBeFalsy()
    expect(isStringSVG('<svg></svg>')).toBeTruthy()
  })
})
