import { describe, expect, it } from 'vitest'
import { jec } from '../../src'

describe('jec', () => {
  it('joins truthy element classes', () => {
    expect(jec('hello', 'world')).toBe('hello world')
    expect(jec('hello', false, 'world')).toBe('hello world')
  })
})
