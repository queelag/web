import { StorageItem, SyncStorage, isWindowDefined } from '@aracna/core'
import { StorageName } from '../definitions/enums.js'

/**
 * The `SessionStorage` is a `SyncStorage` that uses the `sessionStorage` API.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/storages/session-storage)
 */
export const SessionStorage = new SyncStorage(
  StorageName.SESSION,
  () => (isWindowDefined() ? sessionStorage.clear() : undefined),
  (key: string) => (isWindowDefined() ? JSON.parse(sessionStorage.getItem(key) ?? '{}') : {}),
  (key: string) => (isWindowDefined() ? sessionStorage.getItem(key) !== null : false),
  (key: string) => (isWindowDefined() ? sessionStorage.removeItem(key) : undefined),
  (key: string, item: StorageItem) => (isWindowDefined() ? sessionStorage.setItem(key, JSON.stringify(item)) : undefined)
)
