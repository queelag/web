import { beforeEach, describe, expect, it } from 'vitest'
import { SessionStorage } from '../../src'

describe('SessionStorage', () => {
  beforeEach(() => {
    SessionStorage.clear()
  })

  it('clears', () => {
    SessionStorage.set('person', {})
    expect(SessionStorage.has('person')).toBeTruthy()
    SessionStorage.clear()
    expect(SessionStorage.has('person')).toBeFalsy()
  })

  it('gets', () => {
    expect(SessionStorage.get('person')).toBeInstanceOf(Error)
    SessionStorage.set('person', { name: 'john' })
    expect(SessionStorage.get('person')).toStrictEqual({ name: 'john' })
  })

  it('has', () => {
    SessionStorage.set('person', {})
    expect(SessionStorage.has('person')).toBeTruthy()
  })

  it('removes', () => {
    SessionStorage.set('person', {})
    expect(SessionStorage.has('person')).toBeTruthy()
    SessionStorage.remove('person')
    expect(SessionStorage.has('person')).toBeFalsy()
  })

  it('sets', () => {
    SessionStorage.set('person', {})
    expect(SessionStorage.has('person')).toBeTruthy()
  })

  it('does not throw if window is undefined', () => {
    // @ts-ignore
    delete global.window

    expect(SessionStorage.clear()).toBeInstanceOf(Error)
    expect(SessionStorage.get('person')).toBeInstanceOf(Error)
    expect(SessionStorage.has('person')).toBeFalsy()
    expect(SessionStorage.remove('person')).toBeInstanceOf(Error)
    expect(SessionStorage.set('person', {})).toBeInstanceOf(Error)
  })
})
