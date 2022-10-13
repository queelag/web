import { beforeAll, describe, expect, it } from 'vitest'
import { ElementCollector } from '../../src'
import { BaseElement } from '../../src/definitions/elements'

class TestElement extends HTMLElement implements BaseElement {
  id: string = 'id'
  uid: string = 'uid'

  get name(): string {
    return 'name'
  }
}

customElements.define('test-element', TestElement)

describe('ElementCollector', () => {
  let element: BaseElement

  beforeAll(() => {
    element = new TestElement()
  })

  it('gets', () => {
    expect(ElementCollector.get('id')).toBeUndefined()
    expect(ElementCollector.get('uid')).toBeUndefined()
    ElementCollector.set(element)
    expect(ElementCollector.get('id')).toBe(element)
    expect(ElementCollector.get('uid')).toBe(element)
  })

  it('sets', () => {
    ElementCollector.set(element)
    expect(ElementCollector.get('id')).toBe(element)
    expect(ElementCollector.get('uid')).toBe(element)
  })

  it('deletes', () => {
    ElementCollector.set(element)
    expect(ElementCollector.get('id')).toBe(element)
    expect(ElementCollector.get('uid')).toBe(element)
    ElementCollector.delete(element)
    expect(ElementCollector.get('id')).toBeUndefined()
    expect(ElementCollector.get('uid')).toBeUndefined()
  })
})
