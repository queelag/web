import { describe, expect, test } from 'vitest'
import { STUB_DOCUMENT_COOKIE_GET, STUB_DOCUMENT_COOKIE_SET } from '../../src/definitions/stubs'

describe('Stubs', () => {
  test('document cookie', () => {
    let get: Function, set: Function

    get = STUB_DOCUMENT_COOKIE_GET(new Map())
    set = STUB_DOCUMENT_COOKIE_SET(new Map(), () => new Error())

    expect(set('person')).toBeUndefined()
  })
})
