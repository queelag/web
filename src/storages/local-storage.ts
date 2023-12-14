import { Environment, StorageItem, SyncStorage } from '@aracna/core'
import { StorageName } from '../definitions/enums.js'

export const LocalStorage = new SyncStorage(
  StorageName.LOCAL,
  () => (Environment.isWindowDefined ? localStorage.clear() : undefined),
  (key: string) => (Environment.isWindowDefined ? JSON.parse(localStorage.getItem(key) ?? '{}') : {}),
  (key: string) => (Environment.isWindowDefined ? localStorage.getItem(key) !== null : false),
  (key: string) => (Environment.isWindowDefined ? localStorage.removeItem(key) : undefined),
  (key: string, item: StorageItem) => (Environment.isWindowDefined ? localStorage.setItem(key, JSON.stringify(item)) : undefined)
)
