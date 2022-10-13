import { beforeAll, describe, expect, it } from 'vitest'
import { FormFieldElementCollector } from '../../src'
import { BaseElement, FormFieldElement } from '../../src/definitions/elements'

const TARGET: object = {}

class TestElement extends HTMLElement implements FormFieldElement {
  id: string = 'id'
  path: string = 'path'
  target: object = TARGET
  uid: string = 'uid'

  get name(): string {
    return 'name'
  }
}

customElements.define('test-element', TestElement)

describe('FormFieldElementCollector', () => {
  let element: BaseElement

  beforeAll(() => {
    element = new TestElement()
  })

  it('gets', () => {
    expect(FormFieldElementCollector.get('id')).toBeUndefined()
    expect(FormFieldElementCollector.get('uid')).toBeUndefined()
    expect(FormFieldElementCollector.get(TARGET, 'path')).toBeUndefined()
    FormFieldElementCollector.set(element)
    expect(FormFieldElementCollector.get('id')).toBe(element)
    expect(FormFieldElementCollector.get('uid')).toBe(element)
    expect(FormFieldElementCollector.get(TARGET, 'path')).toBe(element)
  })

  it('sets', () => {
    FormFieldElementCollector.set(element)
    expect(FormFieldElementCollector.get('id')).toBe(element)
    expect(FormFieldElementCollector.get('uid')).toBe(element)
    expect(FormFieldElementCollector.get(TARGET, 'path')).toBe(element)
  })

  it('deletes', () => {
    FormFieldElementCollector.set(element)
    expect(FormFieldElementCollector.get('id')).toBe(element)
    expect(FormFieldElementCollector.get('uid')).toBe(element)
    expect(FormFieldElementCollector.get(TARGET, 'path')).toBe(element)
    FormFieldElementCollector.delete(element)
    expect(FormFieldElementCollector.get('id')).toBeUndefined()
    expect(FormFieldElementCollector.get('uid')).toBeUndefined()
    expect(FormFieldElementCollector.get(TARGET, 'path')).toBeUndefined()
  })
})
