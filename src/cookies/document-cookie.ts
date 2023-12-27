import { Cookie, isDocumentNotDefined } from '@aracna/core'

/**
 * The `DocumentCookie` class is a `Cookie` that uses the `document.cookie` API.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/cookies/document-cookie)
 */
export const DocumentCookie: Cookie = new Cookie(
  'DocumentCookie',
  () => {
    if (isDocumentNotDefined()) {
      return ''
    }

    return document.cookie
  },
  (cookie: string) => {
    if (isDocumentNotDefined()) {
      return
    }

    document.cookie = cookie
  }
)
