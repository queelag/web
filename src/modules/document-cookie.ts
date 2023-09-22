import { Cookie, Environment } from '@aracna/core'

/**
 * @category Module
 */
export const DocumentCookie: Cookie = new Cookie(
  'DocumentCookie',
  async () => {
    if (Environment.isDocumentNotDefined) {
      return ''
    }

    return document.cookie
  },
  async (cookie: string) => {
    if (Environment.isDocumentNotDefined) {
      return
    }

    document.cookie = cookie
  }
)
