import { CookieItem, CookieObject, SyncCookie, deserializeCookie, isDocumentNotDefined, serializeCookie } from '@aracna/core'

/**
 * The `DocumentCookie` class is a `Cookie` that uses the `document.cookie` API.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/cookies/document-cookie)
 */
export const DocumentCookie: SyncCookie = new SyncCookie(
  'DocumentCookie',
  () => {
    let object: CookieObject | Error

    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    object = deserializeCookie(document.cookie)
    if (object instanceof Error) throw object

    for (let k in object) {
      let cookie: string | Error

      cookie = serializeCookie(k, '', { expires: new Date(0) })
      if (cookie instanceof Error) throw cookie

      document.cookie = cookie
    }
  },
  <T extends CookieItem>(key: string) => {
    let item: T, object: CookieObject | Error

    // @ts-expect-error
    item = {}

    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    object = deserializeCookie(document.cookie)
    if (object instanceof Error) throw object

    for (let [k, v] of Object.entries(object)) {
      if (k.startsWith(key + DocumentCookie.getSeparator())) {
        // @ts-expect-error
        item[k.replace(key + DocumentCookie.getSeparator(), '')] = v
      }
    }

    return item
  },
  (key: string) => {
    let object: CookieObject | Error

    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    object = deserializeCookie(document.cookie)
    if (object instanceof Error) throw object

    for (let k in object) {
      if (k.startsWith(key + DocumentCookie.getSeparator())) {
        return true
      }
    }

    return false
  },
  (key: string) => {
    let object: CookieObject | Error

    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    object = deserializeCookie(document.cookie)
    if (object instanceof Error) throw object

    for (let k in object) {
      if (k.startsWith(key + DocumentCookie.getSeparator())) {
        let cookie: string | Error

        cookie = serializeCookie(k, '', { expires: new Date(0) })
        if (cookie instanceof Error) throw cookie

        document.cookie = cookie
      }
    }
  },
  <T extends CookieItem>(key: string, item: T) => {
    if (isDocumentNotDefined()) {
      throw new Error('Document is not defined.')
    }

    for (let [k, v] of Object.entries(item)) {
      let cookie: string | Error

      cookie = serializeCookie(key + DocumentCookie.getSeparator() + k, v)
      if (cookie instanceof Error) throw cookie

      document.cookie = cookie
    }
  }
)
