import { noop } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { createDocumentElement } from '../../src'

describe('Document Utils', () => {
  it('creates an element safely', () => {
    global.document = { createElement: noop } as any
    expect(createDocumentElement('div')).toBeUndefined()

    // @ts-ignore
    delete global.document
    expect(createDocumentElement('div')).toStrictEqual({})
  })
})
