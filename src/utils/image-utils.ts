import { DeferredPromise } from '@aracna/core'
import { CACHE_IMAGES } from '../definitions/constants.js'
import { GetImageElementBase64Options } from '../definitions/interfaces.js'
import { UtilLogger } from '../loggers/util-logger.js'

export function cacheImageElement(image: HTMLImageElement, options?: GetImageElementBase64Options): void {
  CACHE_IMAGES.set(image.src, getImageElementBase64(image, options))
  UtilLogger.verbose('ImageUtils', 'cacheImageSrc', `The image has been cached.`, image)
}

export async function cacheImageSrc(src: string, options?: GetImageElementBase64Options): Promise<boolean> {
  let promise: DeferredPromise<boolean>, element: HTMLImageElement

  promise = new DeferredPromise()
  element = document.createElement('img')
  element.crossOrigin = 'anonymous'
  element.src = src
  element.style.opacity = '0'
  element.style.pointerEvents = 'none'
  element.style.position = 'absolute'

  element.onerror = (event: string | Event) => {
    element.remove()
    UtilLogger.error('ImageUtils', 'cacheImageSrc', `The image failed to load.`, event, [src])

    promise.resolve(false)
  }
  element.onload = () => {
    CACHE_IMAGES.set(src, getImageElementBase64(element, options))
    UtilLogger.verbose('ImageUtils', 'cacheImageSrc', `The image has been cached.`, [src])

    element.remove()
    UtilLogger.verbose('ImageUtils', 'cacheImageSrc', `The element has been removed.`, [src])

    promise.resolve(true)
  }

  document.body.appendChild(element)
  UtilLogger.verbose('ImageUtils', 'cacheImageSrc', `The element has been appended to the body.`, element)

  return promise.instance
}

export function getImageElementBase64(image: HTMLImageElement, options?: GetImageElementBase64Options): string {
  let canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null

  canvas = document.createElement('canvas')
  canvas.height = image.naturalHeight
  canvas.width = image.naturalWidth

  context = canvas.getContext('2d')
  if (!context) return ''

  context.drawImage(image, 0, 0)

  return canvas.toDataURL(options?.type, options?.quality)
}
