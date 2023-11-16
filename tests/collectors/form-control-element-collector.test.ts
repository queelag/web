import { beforeAll, describe, expect, it } from 'vitest'
import { FormControlElementCollector } from '../../src'
import { BaseElement, FormControlElement } from '../../src/definitions/elements'

const TARGET: object = {}

class TestElement extends HTMLElement implements FormControlElement {
  id: string = 'id'
  path: string = 'path'
  target: object = TARGET
  uid: string = 'uid'

  get name(): string {
    return 'name'
  }
}

customElements.define('test-element', TestElement)

describe('FormControlElementCollector', () => {
  let element: BaseElement

  beforeAll(() => {
    element = new TestElement()
  })

  it('gets', () => {
    expect(FormControlElementCollector.get('id')).toBeUndefined()
    expect(FormControlElementCollector.get('uid')).toBeUndefined()
    expect(FormControlElementCollector.get(TARGET, 'path')).toBeUndefined()
    FormControlElementCollector.set(element)
    expect(FormControlElementCollector.get('id')).toBe(element)
    expect(FormControlElementCollector.get('uid')).toBe(element)
    expect(FormControlElementCollector.get(TARGET, 'path')).toBe(element)
  })

  it('sets', () => {
    FormControlElementCollector.set(element)
    expect(FormControlElementCollector.get('id')).toBe(element)
    expect(FormControlElementCollector.get('uid')).toBe(element)
    expect(FormControlElementCollector.get(TARGET, 'path')).toBe(element)
  })

  it('deletes', () => {
    FormControlElementCollector.set(element)
    expect(FormControlElementCollector.get('id')).toBe(element)
    expect(FormControlElementCollector.get('uid')).toBe(element)
    expect(FormControlElementCollector.get(TARGET, 'path')).toBe(element)
    FormControlElementCollector.delete(element)
    expect(FormControlElementCollector.get('id')).toBeUndefined()
    expect(FormControlElementCollector.get('uid')).toBeUndefined()
    expect(FormControlElementCollector.get(TARGET, 'path')).toBeUndefined()
  })
})
