import { Environment, Storage, StorageItem } from '@aracna/core'

/**
 * A module to handle session storage operations through a store.
 *
 * @category Module
 */
export const SessionStorage = new Storage(
  'SessionStorage',
  async () => (Environment.isWindowDefined ? sessionStorage.clear() : undefined),
  async (key: string) => (Environment.isWindowDefined ? JSON.parse(sessionStorage.getItem(key) ?? '{}') : {}),
  async (key: string) => (Environment.isWindowDefined ? sessionStorage.getItem(key) !== null : false),
  async (key: string) => (Environment.isWindowDefined ? sessionStorage.removeItem(key) : undefined),
  async (key: string, item: StorageItem) => (Environment.isWindowDefined ? sessionStorage.setItem(key, JSON.stringify(item)) : undefined)
)
