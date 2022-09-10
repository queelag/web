import { Fetch, FetchResponse, isStringURL, rvp, sleep, tcp } from '@queelag/core'
import DOMPurify from 'isomorphic-dompurify'
import { html, svg, TemplateResult } from 'lit'
import { DirectiveResult } from 'lit-html/directive'
import { StyleMapDirective } from 'lit-html/directives/style-map'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { State } from '../decorators/state'
import { CACHE_ICONS, DEFAULT_ICON_SVG_STRING, FETCHING_ICONS, SVG_NAMESPACE_URI } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { IconElementSanitizeConfig } from '../definitions/interfaces'
import { Color } from '../definitions/types'
import { styleMap } from '../directives/style.map'
import { unsafeSVG } from '../directives/unsafe.svg'
import { ElementLogger } from '../loggers/element.logger'
import { getElementStyleCompatibleValue } from '../utils/element.utils'
import { isStringSVG } from '../utils/string.utils'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'queelag-icon': IconElement
  }
}

@CustomElement('queelag-icon')
export class IconElement extends BaseElement {
  @Property({ type: Boolean, reflect: true })
  cache?: boolean

  @Property({ type: String, reflect: true })
  color?: Color

  @Property({ type: String, reflect: true })
  fill?: string

  @Property({ type: Object })
  sanitize: IconElementSanitizeConfig = { RETURN_DOM: false, RETURN_DOM_FRAGMENT: false }

  @Property({ type: String, reflect: true })
  src!: string

  @Property({ type: String, reflect: true })
  stroke?: string

  @Property({ type: String, attribute: 'stroke-width', reflect: true })
  strokeWidth?: string

  @State()
  private svgElement: SVGSVGElement = document.createElementNS(SVG_NAMESPACE_URI, 'svg')

  connectedCallback(): void {
    super.connectedCallback()
    this.generateSVGElement()
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name !== 'src' || Object.is(_old, value)) {
      return
    }

    this.generateSVGElement()
  }

  private generateSVGElement(): void {
    if (this.src === null) {
      ElementLogger.warn(this.uid, 'generateSVGElement', `The src property is null.`, [this.src])
      return this.parseSVGString(DEFAULT_ICON_SVG_STRING)
    }

    if (isStringURL(this.src)) {
      ElementLogger.verbose(this.uid, 'generateSVGElement', `The src property is an URL, will try to fetch.`, [this.src])
      this.fetchSource()
      return
    }

    if (isStringSVG(this.src)) {
      ElementLogger.verbose(this.uid, 'generateSVGElement', `The src property is a SVG, will try to parse.`, [this.src])
      return this.parseSVGString(this.src)
    }

    ElementLogger.warn(this.uid, 'generateSVGElement', `The value is nor URL nor SVG, falling back to empty SVG.`, [this.src])
    this.parseSVGString(DEFAULT_ICON_SVG_STRING)
  }

  private async fetchSource(): Promise<void> {
    let cache: string | undefined, response: FetchResponse<string> | Error, text: string | Error

    if (FETCHING_ICONS.has(this.src)) {
      ElementLogger.verbose(this.uid, 'fetchSource', `The src is already being fetched, will try again in 100ms.`, [this.src])
      await sleep(100)

      return this.fetchSource()
    }

    cache = CACHE_ICONS.get(this.src)
    if (typeof cache === 'string') {
      ElementLogger.verbose(this.uid, 'fetchSource', `Cached SVG found for this src, will parse.`, [this.src, cache])
      return this.parseSVGString(cache)
    }

    FETCHING_ICONS.add(this.src)
    ElementLogger.verbose(this.uid, 'fetchSource', `The src has been marked as fetching.`, [this.src])

    response = await Fetch.get(this.src, { parse: false })
    if (response instanceof Error) return rvp(() => FETCHING_ICONS.delete(this.src))

    FETCHING_ICONS.delete(this.src)
    ElementLogger.verbose(this.uid, 'fetchSource', `The src has been unmarked as fetching.`, [this.src])

    text = await tcp(() => (response as FetchResponse).text())
    if (text instanceof Error) return rvp(() => CACHE_ICONS.delete(this.src))

    if (this.cache) {
      CACHE_ICONS.set(this.src, text)
      ElementLogger.verbose(this.uid, 'fetchSource', `The icon has been cached.`, [this.src, text])
    }

    this.parseSVGString(text)
  }

  private parseSVGString(string: string): void {
    let parser: DOMParser, document: Document, element: SVGSVGElement | null

    parser = new DOMParser()
    document = parser.parseFromString(DOMPurify.sanitize(string, this.sanitize), 'text/html')

    element = document.querySelector('svg')
    if (!element) return ElementLogger.error(this.uid, 'parseSVGString', `Failed to find the svg element.`, document)

    this.svgElement = element
    ElementLogger.verbose(this.uid, 'parseSVGString', `The svg element has been set.`, this.svgElement)
  }

  render() {
    return html`<svg
      fill=${this.fill}
      stroke=${this.stroke}
      stroke-width=${this.strokeWidth}
      style=${this.svgElementStyle}
      viewBox=${this.svgElementViewBox}
      xmlns=${SVG_NAMESPACE_URI}
    >
      ${this.svgElementTemplate}
    </svg>`
  }

  private get svgElementInnerHTML(): string {
    return this.svgElement.innerHTML
  }

  private get svgElementStyle(): DirectiveResult<typeof StyleMapDirective> {
    return styleMap({
      height: getElementStyleCompatibleValue(this.height || this.size),
      maxHeight: getElementStyleCompatibleValue(this.height || this.size),
      maxWidth: getElementStyleCompatibleValue(this.width || this.size),
      minHeight: getElementStyleCompatibleValue(this.height || this.size),
      minWidth: getElementStyleCompatibleValue(this.width || this.size),
      width: getElementStyleCompatibleValue(this.width || this.size)
    })
  }

  private get svgElementTemplate(): TemplateResult {
    return svg`${unsafeSVG(this.svgElementInnerHTML)}`
  }

  private get svgElementViewBox(): string {
    return this.svgElement.getAttribute('viewbox') || this.svgElement.getAttribute('viewBox') || '0 0 0 0'
  }

  get name(): ElementName {
    return ElementName.ICON
  }
}
