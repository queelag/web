import { Cookie, Environment } from '@aracna/core'

export const DocumentCookie: Cookie = new Cookie(
  'DocumentCookie',
  () => {
    if (Environment.isDocumentNotDefined) {
      return ''
    }

    return document.cookie
  },
  (cookie: string) => {
    if (Environment.isDocumentNotDefined) {
      return
    }

    document.cookie = cookie
  }
)