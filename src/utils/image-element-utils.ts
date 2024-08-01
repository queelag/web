import { DeferredPromise, tc } from '@aracna/core'
import { CACHE_IMAGES } from '../definitions/constants.js'
import type { CacheImageElementBase64, CacheImageSrcBase64, GetImageElementBase64Options, GetImageSrcBase64Options } from '../definitions/interfaces.js'
import { UtilLogger } from '../loggers/util-logger.js'

/**
 * Caches the base64 data of an image element.
 *
 * - Optionally the caching can be forced even if the image has already been cached.
 * - Optionally the quality and type of the saved data can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/image-element)
 */
export function cacheImageElement(image: HTMLImageElement, options?: CacheImageElementBase64): void | Error {
  let base64: string | Error

  if (options?.force !== true && CACHE_IMAGES.has(image.src)) {
    return new Error('The image has already been cached.')
  }

  base64 = getImageElementBase64(image, options)
  if (base64 instanceof Error) return base64

  CACHE_IMAGES.set(image.src, base64)
  UtilLogger.verbose('cacheImageElement', `The image has been cached.`, image)
}

/**
 * Caches the base64 data from an image src.
 *
 * - Optionally the caching can be forced even if the src has already been cached.
 * - Optionally the quality and type of the saved data can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/image-element)
 */
export async function cacheImageSrc(src: string, options?: CacheImageSrcBase64): Promise<void | Error> {
  let base64: string | Error

  if (options?.force !== true && CACHE_IMAGES.has(src)) {
    return new Error('The src has already been cached.')
  }

  base64 = await getImageSrcBase64(src, options)
  if (base64 instanceof Error) return base64

  CACHE_IMAGES.set(src, base64)
  UtilLogger.verbose('cacheImageSrc', `The src has been cached.`, [src])
}

/**
 * Returns the base64 data of an image element.
 * Optionally the quality and type of the saved data can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/image-element)
 */
export function getImageElementBase64(image: HTMLImageElement, options?: GetImageElementBase64Options): string | Error {
  let canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null, draw: void | Error, base64: string | Error

  if (options?.cache && CACHE_IMAGES.has(image.src)) {
    return CACHE_IMAGES.get(image.src) as string
  }

  canvas = document.createElement('canvas')
  canvas.height = image.naturalHeight
  canvas.width = image.naturalWidth

  context = canvas.getContext('2d')
  if (!context) return new Error('The 2D context is null.')

  draw = tc(() => context?.drawImage(image, 0, 0))
  if (draw instanceof Error) return draw

  base64 = tc(() => canvas.toDataURL(options?.type, options?.quality))
  if (base64 instanceof Error) return base64

  return base64
}

/**
 * Returns the base64 data from an image src.
 * Optionally the quality and type of the saved data can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/utils/image-element)
 */
export async function getImageSrcBase64(src: string, options?: GetImageSrcBase64Options): Promise<string | Error> {
  let promise: DeferredPromise<string | Error>, element: HTMLImageElement

  if (options?.cache && CACHE_IMAGES.has(src)) {
    return CACHE_IMAGES.get(src) as string
  }

  promise = new DeferredPromise()
  element = document.createElement('img')
  element.crossOrigin = options?.crossOrigin ?? null
  element.src = src
  element.style.opacity = '0'
  element.style.pointerEvents = 'none'
  element.style.position = 'absolute'

  element.onerror = (event: string | Event) => {
    element.remove()
    UtilLogger.error('getImageSrcBase64', `The image failed to load.`, event, [src])

    promise.resolve(new Error(`Failed to load the image.`))
  }
  element.onload = () => {
    let base64: string | Error

    base64 = getImageElementBase64(element, options)
    if (base64 instanceof Error) return promise.resolve(base64)

    element.remove()
    UtilLogger.verbose('getImageSrcBase64', `The element has been removed.`, [src])

    promise.resolve(base64)
  }

  document.body.append(element)
  UtilLogger.verbose('getImageSrcBase64', `The element has been appended to the body.`, element)

  return promise.instance
}
