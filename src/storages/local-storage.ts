import { StorageItem, SyncStorage, isWindowDefined } from '@aracna/core'
import { StorageName } from '../definitions/enums.js'

export const LocalStorage = new SyncStorage(
  StorageName.LOCAL,
  () => (isWindowDefined() ? localStorage.clear() : undefined),
  (key: string) => (isWindowDefined() ? JSON.parse(localStorage.getItem(key) ?? '{}') : {}),
  (key: string) => (isWindowDefined() ? localStorage.getItem(key) !== null : false),
  (key: string) => (isWindowDefined() ? localStorage.removeItem(key) : undefined),
  (key: string, item: StorageItem) => (isWindowDefined() ? localStorage.setItem(key, JSON.stringify(item)) : undefined)
)
