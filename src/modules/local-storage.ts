import { Environment, StorageItem, SyncStorage } from '@aracna/core'

/**
 * @category Module
 */
export const LocalStorage = new SyncStorage(
  'LocalStorage',
  () => (Environment.isWindowDefined ? localStorage.clear() : undefined),
  (key: string) => (Environment.isWindowDefined ? JSON.parse(localStorage.getItem(key) ?? '{}') : {}),
  (key: string) => (Environment.isWindowDefined ? localStorage.getItem(key) !== null : false),
  (key: string) => (Environment.isWindowDefined ? localStorage.removeItem(key) : undefined),
  (key: string, item: StorageItem) => (Environment.isWindowDefined ? localStorage.setItem(key, JSON.stringify(item)) : undefined)
)
