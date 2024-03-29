import { beforeEach, describe, expect, it } from 'vitest'
import { LocalStorage } from '../../src'

describe('LocalStorage', () => {
  beforeEach(() => {
    LocalStorage.clear()
  })

  it('clears', () => {
    LocalStorage.set('person', {})
    expect(LocalStorage.has('person')).toBeTruthy()
    LocalStorage.clear()
    expect(LocalStorage.has('person')).toBeFalsy()
  })

  it('gets', () => {
    expect(LocalStorage.get('person')).toBeInstanceOf(Error)
    LocalStorage.set('person', { name: 'john' })
    expect(LocalStorage.get('person')).toStrictEqual({ name: 'john' })
  })

  it('has', () => {
    LocalStorage.set('person', {})
    expect(LocalStorage.has('person')).toBeTruthy()
  })

  it('removes', () => {
    LocalStorage.set('person', {})
    expect(LocalStorage.has('person')).toBeTruthy()
    LocalStorage.remove('person')
    expect(LocalStorage.has('person')).toBeFalsy()
  })

  it('sets', () => {
    LocalStorage.set('person', {})
    expect(LocalStorage.has('person')).toBeTruthy()
  })

  it('does not throw if window is undefined', () => {
    // @ts-ignore
    delete global.window

    expect(LocalStorage.clear()).toBeInstanceOf(Error)
    expect(LocalStorage.get('person')).toBeInstanceOf(Error)
    expect(LocalStorage.has('person')).toBeFalsy()
    expect(LocalStorage.remove('person')).toBeInstanceOf(Error)
    expect(LocalStorage.set('person', {})).toBeInstanceOf(Error)
  })
})
