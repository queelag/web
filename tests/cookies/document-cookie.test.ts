import { beforeEach, describe, expect, it } from 'vitest'
import { DocumentCookie } from '../../src'

describe('DocumentCookie', () => {
  beforeEach(() => {
    DocumentCookie.clear()
  })

  it('sets and gets', () => {
    DocumentCookie.set('person', { name: 'john' })
    expect(DocumentCookie.get('person')).toStrictEqual({ name: 'john' })
  })

  it('does not throw if document is undefined', () => {
    // @ts-ignore
    delete global.document

    expect(DocumentCookie.set('person', { name: 'john' })).toBeUndefined()
    expect(DocumentCookie.get('person')).toStrictEqual({})
  })
})
