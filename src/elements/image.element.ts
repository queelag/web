import { DeferredPromise, sleep } from '@queelag/core'
import { html } from 'lit-html'
import { DirectiveResult } from 'lit-html/directive'
import { StyleMapDirective } from 'lit-html/directives/style-map'
import { BaseElement } from '../classes/base.element'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { State } from '../decorators/state'
import { CACHE_IMAGES, DEFAULT_IMAGE_SIZE, DEFAULT_IMAGE_SRC, FETCHING_IMAGES } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { ImageCacheOptions } from '../definitions/interfaces'
import { ImageCrossOrigin } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { stylemap } from '../directives/style.map'
import { until } from '../directives/until'
import { ElementLogger } from '../loggers/element.logger'
import { getElementStyleCompatibleValue } from '../utils/dom.utils'
import { getImageElementBase64 } from '../utils/image.utils'

@CustomElement('queelag-image')
export class ImageElement extends BaseElement {
  @Property({ type: String })
  alt?: string

  @Property({ type: Boolean })
  cache?: boolean

  @Property({ type: Object })
  cacheOptions?: ImageCacheOptions

  @Property({ type: String })
  crossOrigin?: ImageCrossOrigin

  @Property({ type: String })
  height?: string

  @Property({ type: String })
  src: string = DEFAULT_IMAGE_SRC

  @Property({ type: String })
  width?: string

  @Query('img')
  private img_element!: HTMLImageElement

  @State()
  private img_element_src: DeferredPromise<string> = new DeferredPromise()

  connectedCallback(): void {
    super.connectedCallback()
    this.try_to_load_from_cache()
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name !== 'src' || Object.is(_old, value)) {
      return
    }

    this.try_to_load_from_cache()
  }

  private async try_to_load_from_cache(): Promise<void> {
    let cache: string | undefined

    if (this.src === null) {
      ElementLogger.warn(this.uid, 'try_to_load_from_cache', `The src property is null.`, [this.src])
      return
    }

    if (FETCHING_IMAGES.has(this.src)) {
      await sleep(100)
      ElementLogger.verbose(this.uid, 'try_to_load_from_cache', `The src is already being fetched, will try again in 100ms.`, [this.src])

      return this.try_to_load_from_cache()
    }

    cache = CACHE_IMAGES.get(this.src)
    if (typeof cache === 'string') {
      this.img_element_src.resolve(cache)
      ElementLogger.verbose(this.uid, 'try_to_load_from_cache', `Cached base64 found for this image, will use it.`, [this.src, cache])

      return
    }

    if (this.img_element_src.isResolved) {
      return
    }

    FETCHING_IMAGES.add(this.src)
    ElementLogger.verbose(this.uid, 'try_to_load_from_cache', `The src has been marked as fetching.`, [this.src])

    this.img_element_src.resolve(this.src)
  }

  private on_error(event: ErrorEvent): void {
    FETCHING_IMAGES.delete(this.src)
    ElementLogger.verbose(this.uid, 'on_error', `The src has been unmarked as fetching.`, [this.src])

    this.img_element_src = new DeferredPromise()
    this.img_element_src.resolve(DEFAULT_IMAGE_SRC)

    ElementLogger.error(this.uid, 'on_error', `Falling back to the default img src.`, event)
  }

  private on_load(): void {
    let base64: string

    FETCHING_IMAGES.delete(this.src)
    ElementLogger.verbose(this.uid, 'on_load', `The src has been unmarked as fetching.`, [this.src])

    if (!this.cache) {
      return
    }

    if (this.src === DEFAULT_IMAGE_SRC) {
      return
    }

    // if (CACHE_IMAGES.has(this.src) && !FETCHING_IMAGES.has(this.src)) {
    //   return
    // }

    base64 = getImageElementBase64(this.img_element, this.cacheOptions)
    if (!base64) return ElementLogger.warn(this.uid, 'on_load', `The base64 is empty.`, [base64])

    CACHE_IMAGES.set(this.src, base64)
    ElementLogger.verbose(this.uid, 'on_load', `The image has been cached.`, [this.src, base64])
  }

  render() {
    return html`
      <img
        alt=${ifdef(this.alt)}
        crossorigin=${ifdef(this.img_element_crossorigin)}
        @error=${this.on_error}
        @load=${this.on_load}
        src=${until(this.img_element_src.instance)}
        style=${this.img_element_style}
      />
      ${this.shape_html}
    `
  }

  private get img_element_crossorigin(): ImageCrossOrigin | undefined {
    if (this.crossOrigin) {
      return this.crossOrigin
    }

    if (this.cache) {
      return 'anonymous'
    }
  }

  private get img_element_style(): DirectiveResult<typeof StyleMapDirective> {
    return stylemap({
      ...this.shape_style_info,
      height: getElementStyleCompatibleValue(this.height || this.size || DEFAULT_IMAGE_SIZE),
      maxHeight: getElementStyleCompatibleValue(this.height || this.size),
      maxWidth: getElementStyleCompatibleValue(this.width || this.size),
      minHeight: getElementStyleCompatibleValue(this.height || this.size),
      minWidth: getElementStyleCompatibleValue(this.width || this.size),
      width: getElementStyleCompatibleValue(this.width || this.size || DEFAULT_IMAGE_SIZE)
    })
  }

  get name(): ElementName {
    return ElementName.IMAGE
  }
}
