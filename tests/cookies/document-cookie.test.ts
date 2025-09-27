import { beforeEach, describe, expect, it } from 'vitest'
import { DocumentCookie } from '../../src/cookies/document-cookie'

describe('DocumentCookie', () => {
  beforeEach(() => {
    DocumentCookie.clear()
  })

  it('clears', () => {
    DocumentCookie.set('person', { name: 'john' })
    expect(DocumentCookie.has('person')).toBeTruthy()
    DocumentCookie.clear()
    expect(DocumentCookie.has('person')).toBeFalsy()
  })

  it('gets', () => {
    expect(DocumentCookie.get('person')).toStrictEqual({})
    DocumentCookie.set('person', { name: 'john' })
    expect(DocumentCookie.get('person')).toStrictEqual({ name: 'john' })
  })

  it('has', () => {
    DocumentCookie.set('person', { name: 'john' })
    expect(DocumentCookie.has('person')).toBeTruthy()
  })

  it('removes', () => {
    DocumentCookie.set('person', { name: 'john' })
    expect(DocumentCookie.has('person')).toBeTruthy()
    DocumentCookie.remove('person')
    expect(DocumentCookie.has('person')).toBeFalsy()
  })

  it('sets', () => {
    DocumentCookie.set('person', { name: 'john' })
    expect(DocumentCookie.has('person')).toBeTruthy()
  })

  it('does not throw if document is undefined', () => {
    // @ts-ignore
    delete global.document

    expect(DocumentCookie.clear()).toBeInstanceOf(Error)
    expect(DocumentCookie.get('person')).toBeInstanceOf(Error)
    expect(DocumentCookie.has('person')).toBeFalsy()
    expect(DocumentCookie.remove('person')).toBeInstanceOf(Error)
    expect(DocumentCookie.set('person', {})).toBeInstanceOf(Error)
  })
})
