import { Environment, StorageItem, SyncStorage } from '@aracna/core'

/**
 * @category Module
 */
export const SessionStorage = new SyncStorage(
  'SessionStorage',
  () => (Environment.isWindowDefined ? sessionStorage.clear() : undefined),
  (key: string) => (Environment.isWindowDefined ? JSON.parse(sessionStorage.getItem(key) ?? '{}') : {}),
  (key: string) => (Environment.isWindowDefined ? sessionStorage.getItem(key) !== null : false),
  (key: string) => (Environment.isWindowDefined ? sessionStorage.removeItem(key) : undefined),
  (key: string, item: StorageItem) => (Environment.isWindowDefined ? sessionStorage.setItem(key, JSON.stringify(item)) : undefined)
)
