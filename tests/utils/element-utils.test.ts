import { beforeEach, describe, expect, it } from 'vitest'
import { getElementStyleCompatibleValue, removeImmutableElementAttribute, setElementAttribute, setImmutableElementAttribute } from '../../src'

describe('Element Utils', () => {
  let element: HTMLDivElement

  beforeEach(() => {
    element = document.createElement('div')
  })

  it('gets element style compatible value', () => {
    expect(getElementStyleCompatibleValue(0)).toBe('0px')
    expect(getElementStyleCompatibleValue('0')).toBe('0px')
    expect(getElementStyleCompatibleValue('0vw')).toBe('0vw')
    expect(getElementStyleCompatibleValue(false)).toBeUndefined()
  })

  it('sets element attribute', () => {
    setElementAttribute(element, 'attribute', 'true')
    expect(element.getAttribute('attribute')).toBe('true')
    setElementAttribute(element, 'attribute', null)
    expect(element.getAttribute('attribute')).toBeNull()
  })

  it('sets immutable element attribute', () => {
    setImmutableElementAttribute(element, 'attribute', 'true')
    expect(element.getAttribute('attribute')).toBe('true')
    element['attribute'] = 'false'
    expect(element.getAttribute('attribute')).toBe('true')
  })

  it('removes immutable element attribute', () => {
    setImmutableElementAttribute(element, 'attribute', 'true')
    expect(element.getAttribute('attribute')).toBe('true')
    removeImmutableElementAttribute(element, 'attribute')
    expect(element.getAttribute('attribute')).toBeNull()
  })

  it('scrolls element into view', () => {
    // dont know how to write the test
  })
})
