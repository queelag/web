import { Cookie, isDocumentNotDefined } from '@aracna/core'

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
