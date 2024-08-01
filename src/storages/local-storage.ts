import { type StorageItem, SyncStorage, isWindowNotDefined } from '@aracna/core'
import { StorageName } from '../definitions/enums.js'

/**
 * The `LocalStorage` is a `SyncStorage` that uses the `localStorage` API.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/storages/local-storage)
 */
export const LocalStorage = new SyncStorage(
  StorageName.LOCAL,
  () => {
    if (isWindowNotDefined()) {
      return new Error('The window object is not defined.')
    }

    return localStorage.clear()
  },
  (key: string) => {
    let item: string | null

    if (isWindowNotDefined()) {
      return new Error('The window object is not defined.')
    }

    item = localStorage.getItem(key)

    if (item === null) {
      return new Error(`The item "${key}" does not exist in the LocalStorage.`)
    }

    return JSON.parse(item)
  },
  (key: string) => {
    if (isWindowNotDefined()) {
      return false
    }

    return localStorage.getItem(key) !== null
  },
  (key: string) => {
    if (isWindowNotDefined()) {
      return new Error('The window object is not defined.')
    }

    return localStorage.removeItem(key)
  },
  (key: string, item: StorageItem) => {
    if (isWindowNotDefined()) {
      return new Error('The window object is not defined.')
    }

    return localStorage.setItem(key, JSON.stringify(item))
  }
)
