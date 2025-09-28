import {
  CookieItem,
  CookieObject,
  CookieOptions,
  DeserializeCookieOptions,
  KeyOf,
  SerializeCookieOptions,
  SyncCookie,
  deserializeCookie,
  isDocumentNotDefined,
  serializeCookie
} from '@aracna/core'

/**
 * The `DocumentCookie` class is a `Cookie` that uses the `document.cookie` API.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/cookies/document-cookie)
 */
export const DocumentCookie: SyncCookie<CookieOptions, DeserializeCookieOptions, SerializeCookieOptions> = new SyncCookie(
  'DocumentCookie',
  (options?: SerializeCookieOptions) => {
    let object: CookieObject | Error

    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    object = deserializeCookie(document.cookie)
    if (object instanceof Error) throw object

    for (let [k, v] of Object.entries(object)) {
      let cookie: string | Error

      cookie = serializeCookie(k, v, { ...options, expires: new Date(0) })
      if (cookie instanceof Error) throw cookie

      document.cookie = cookie
    }
  },
  <T extends CookieItem>(key: string, options?: DeserializeCookieOptions) => {
    let item: T, object: CookieObject | Error

    // @ts-expect-error
    item = {}

    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    object = deserializeCookie(document.cookie, options)
    if (object instanceof Error) throw object

    for (let [k, v] of Object.entries(object)) {
      if (k.startsWith(key + DocumentCookie.getSeparator())) {
        // @ts-expect-error
        item[k.replace(key + DocumentCookie.getSeparator(), '')] = v
      }
    }

    return item
  },
  (key: string, options?: DeserializeCookieOptions) => {
    let object: CookieObject | Error

    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    object = deserializeCookie(document.cookie, options)
    if (object instanceof Error) throw object

    for (let k in object) {
      if (k.startsWith(key + DocumentCookie.getSeparator())) {
        return true
      }
    }

    return false
  },
  <T extends CookieItem>(key: string, keys?: KeyOf.Shallow<T>[], options?: SerializeCookieOptions) => {
    let object: CookieObject | Error

    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    object = deserializeCookie(document.cookie)
    if (object instanceof Error) throw object

    if (typeof keys === 'undefined') {
      for (let [k, v] of Object.entries(object)) {
        if (k.startsWith(key + DocumentCookie.getSeparator())) {
          let cookie: string | Error

          cookie = serializeCookie(k, v, { ...options, expires: new Date(0) })
          if (cookie instanceof Error) throw cookie

          document.cookie = cookie
        }
      }

      return
    }

    for (let k1 of keys) {
      let entry: [string, any] | undefined, cookie: string | Error

      entry = Object.entries(object).find(([k2]) => k2.startsWith(key + DocumentCookie.getSeparator() + k1.toString()))
      if (!entry) continue

      cookie = serializeCookie(...entry, { ...options, expires: new Date(0) })
      if (cookie instanceof Error) throw cookie

      document.cookie = cookie
    }
  },
  <T extends CookieItem>(key: string, item: T, options?: SerializeCookieOptions) => {
    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    for (let [k, v] of Object.entries(item)) {
      let cookie: string | Error

      cookie = serializeCookie(key + DocumentCookie.getSeparator() + k, v, options)
      if (cookie instanceof Error) throw cookie

      document.cookie = cookie
    }
  }
)
