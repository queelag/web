import { type StorageItem, SyncStorage, isWindowNotDefined } from '@aracna/core'
import { StorageName } from '../definitions/enums.js'

/**
 * The `SessionStorage` is a `SyncStorage` that uses the `sessionStorage` API.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/storages/session-storage)
 */
export const SessionStorage = new SyncStorage(
  StorageName.SESSION,
  () => {
    if (isWindowNotDefined()) {
      return new Error('The window object is not defined.')
    }

    return sessionStorage.clear()
  },
  (key: string) => {
    let item: string | null

    if (isWindowNotDefined()) {
      return new Error('The window object is not defined.')
    }

    item = sessionStorage.getItem(key)

    if (item === null) {
      return new Error(`The item "${key}" does not exist in the SessionStorage.`)
    }

    return JSON.parse(item)
  },
  (key: string) => {
    if (isWindowNotDefined()) {
      return false
    }

    return sessionStorage.getItem(key) !== null
  },
  (key: string) => {
    if (isWindowNotDefined()) {
      return new Error('The window object is not defined.')
    }

    return sessionStorage.removeItem(key)
  },
  (key: string, item: StorageItem) => {
    if (isWindowNotDefined()) {
      return new Error('The window object is not defined.')
    }

    return sessionStorage.setItem(key, JSON.stringify(item))
  }
)
