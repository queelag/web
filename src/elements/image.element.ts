import { DeferredPromise, sleep } from '@queelag/core'
import { html } from 'lit-html'
import { DirectiveResult } from 'lit-html/directive'
import { StyleMapDirective } from 'lit-html/directives/style-map'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { State } from '../decorators/state'
import { CACHE_IMAGES, DEFAULT_IMAGE_SIZE, DEFAULT_IMAGE_SRC, FETCHING_IMAGES } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { ImageElementCacheType, ImageElementCrossOrigin } from '../definitions/types'
import { ifdef } from '../directives/if.defined'
import { styleMap } from '../directives/style.map'
import { until } from '../directives/until'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from '../mixins/base.element'
import { getElementStyleCompatibleValue } from '../utils/dom.utils'
import { getImageElementBase64 } from '../utils/image.utils'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-image': ImageElement
  }
}

@CustomElement('queelag-image')
export class ImageElement extends BaseElement {
  @Property({ type: String, reflect: true })
  alt?: string

  @Property({ type: Boolean, reflect: true })
  cache?: boolean

  @Property({ type: Number, attribute: 'cache-quality', reflect: true })
  cache_quality?: number

  @Property({ type: String, attribute: 'cache-type', reflect: true })
  cache_type?: ImageElementCacheType

  @Property({ type: String, attribute: 'cross-origin', reflect: true })
  cross_origin?: ImageElementCrossOrigin

  @Property({ type: Boolean, reflect: true })
  eager?: boolean

  @Property({ type: Boolean, reflect: true })
  lazy?: boolean

  @Property({ type: String, reflect: true })
  src: string = DEFAULT_IMAGE_SRC

  @Query('img')
  private img_element!: HTMLImageElement

  @State()
  private img_element_src: DeferredPromise<string> = new DeferredPromise()

  connectedCallback(): void {
    super.connectedCallback()
    this.load()
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name !== 'src' || Object.is(_old, value)) {
      return
    }

    this.load()
  }

  private async load(): Promise<void> {
    let cache: string | undefined

    if (this.src === null) {
      ElementLogger.warn(this.uid, 'load', `The src property is null.`, [this.src])
      return
    }

    if (FETCHING_IMAGES.has(this.src)) {
      await sleep(100)
      ElementLogger.verbose(this.uid, 'load', `The src is already being fetched, will try again in 100ms.`, [this.src])

      return this.load()
    }

    cache = CACHE_IMAGES.get(this.src)
    if (typeof cache === 'string') {
      this.img_element_src.resolve(cache)
      ElementLogger.verbose(this.uid, 'load', `Cached base64 found for this image, will use it.`, [this.src, cache])

      return
    }

    if (this.img_element_src.isResolved) {
      ElementLogger.verbose(this.uid, 'load', `The src was already resolved.`, [this.src])
      return
    }

    FETCHING_IMAGES.add(this.src)
    ElementLogger.verbose(this.uid, 'load', `The src has been marked as fetching.`, [this.src])

    this.img_element_src.resolve(this.src)
  }

  private onError(event: ErrorEvent): void {
    FETCHING_IMAGES.delete(this.src)
    ElementLogger.verbose(this.uid, 'onError', `The src has been unmarked as fetching.`, [this.src])

    this.img_element_src = new DeferredPromise()
    this.img_element_src.resolve(DEFAULT_IMAGE_SRC)

    ElementLogger.error(this.uid, 'onError', `Falling back to the default img src.`, event)
  }

  private onLoad(): void {
    let base64: string

    FETCHING_IMAGES.delete(this.src)
    ElementLogger.verbose(this.uid, 'onLoad', `The src has been unmarked as fetching.`, [this.src])

    if (!this.cache) {
      return
    }

    if (this.src === DEFAULT_IMAGE_SRC) {
      return
    }

    // if (CACHE_IMAGES.has(this.src) && !FETCHING_IMAGES.has(this.src)) {
    //   return
    // }

    base64 = getImageElementBase64(this.img_element, { quality: this.cache_quality, type: this.cache_type })
    if (!base64) return ElementLogger.warn(this.uid, 'onLoad', `The base64 is empty.`, [base64])

    CACHE_IMAGES.set(this.src, base64)
    ElementLogger.verbose(this.uid, 'onLoad', `The image has been cached.`, [this.src, base64])
  }

  render() {
    return html`
      <img
        alt=${ifdef(this.alt)}
        crossorigin=${ifdef(this.img_element_crossorigin)}
        @error=${this.onError}
        @load=${this.onLoad}
        loading=${this.img_element_loading}
        src=${until(this.img_element_src.instance)}
        style=${this.img_element_style}
      />
      ${this.shape_html}
    `
  }

  private get img_element_crossorigin(): ImageElementCrossOrigin | undefined {
    if (this.cross_origin) {
      return this.cross_origin
    }

    if (this.cache) {
      return 'anonymous'
    }
  }

  private get img_element_loading(): 'auto' | 'eager' | 'lazy' {
    if (this.eager) {
      return 'eager'
    }

    if (this.lazy) {
      return 'lazy'
    }

    return 'auto'
  }

  private get img_element_style(): DirectiveResult<typeof StyleMapDirective> {
    return styleMap({
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
