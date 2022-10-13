import { STUB_COOKIE_GET, STUB_COOKIE_SET, STUB_STORAGE } from '@queelag/core'

export const STUB_DOCUMENT_COOKIE_MAP: Map<string, string> = new Map()
export const STUB_DOCUMENT_COOKIE_ATTRIBUTES: PropertyDescriptor = {
  get: STUB_COOKIE_GET(STUB_DOCUMENT_COOKIE_MAP),
  set: STUB_COOKIE_SET(STUB_DOCUMENT_COOKIE_MAP)
}

export const STUB_LOCAL_STORAGE_MAP: Map<string, string> = new Map()
export const STUB_LOCAL_STORAGE: Storage = STUB_STORAGE(STUB_LOCAL_STORAGE_MAP)

export const STUB_SESSION_STORAGE_MAP: Map<string, string> = new Map()
export const STUB_SESSION_STORAGE: Storage = STUB_STORAGE(STUB_SESSION_STORAGE_MAP)
