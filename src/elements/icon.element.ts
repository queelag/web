import { Fetch, FetchResponse, isStringURL, rvp, sleep, tcp } from '@queelag/core'
import { sanitize } from 'isomorphic-dompurify'
import { html, svg, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators/custom-element.js'
import { property } from 'lit/decorators/property.js'
import { state } from 'lit/decorators/state.js'
import { styleMap } from 'lit/directives/style-map.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { BaseElement } from '../classes/base.element'
import { CACHE_ICONS, DEFAULT_ICON_SVG_STRING, SVG_NAMESPACE_URI } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import { IconElementSanitizeConfig } from '../definitions/interfaces'
import { Color } from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'
import { getElementStyleCompatibleValue } from '../utils/dom.utils'
import { isStringSVG } from '../utils/string.utils'

@customElement('queelag-icon')
export class IconElement extends BaseElement {
  @property({ type: String, reflect: true })
  color?: Color

  @property({ type: String })
  fill?: string

  @property({ type: String })
  height?: string

  @property({ type: Object })
  sanitize: IconElementSanitizeConfig = { RETURN_DOM: false, RETURN_DOM_FRAGMENT: false }

  @property({ type: String })
  src: string = ''

  @property({ type: String })
  stroke?: string

  @property({ type: String })
  strokeWidth?: string

  @property({ type: String })
  width?: string

  @state()
  private svg_element: SVGSVGElement = document.createElementNS(SVG_NAMESPACE_URI, 'svg')

  constructor() {
    super()
    this.construct(ElementName.ICON)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value)

    if (name !== 'src' || Object.is(_old, value)) {
      return
    }

    if (value === null) {
      ElementLogger.warn(this.qid, 'attributeChangedCallback', `The src property is null.`, [value])
      return this.parse_svg_string(DEFAULT_ICON_SVG_STRING)
    }

    if (isStringURL(value)) {
      ElementLogger.verbose(this.qid, 'attributeChangedCallback', `The src property is an URL, will try to fetch.`, [value])
      this.fetch_source()
      return
    }

    if (isStringSVG(value)) {
      ElementLogger.verbose(this.qid, 'attributeChangedCallback', `The src property is a SVG, will try to parse.`, [value])
      return this.parse_svg_string(value)
    }

    ElementLogger.warn(this.qid, 'attributeChangedCallback', `The value is nor URL nor SVG, falling back to empty SVG.`, [value])
    this.parse_svg_string(DEFAULT_ICON_SVG_STRING)
  }

  private async fetch_source(): Promise<void> {
    let cache: string | undefined, response: FetchResponse<string> | Error, text: string | Error

    cache = CACHE_ICONS.get(this.src)
    if (cache === 'fetching') {
      ElementLogger.verbose(this.qid, 'fetch_source', `This src is being fetched by another icon, will try again in 100ms.`, [this.src])
      await sleep(100)

      return this.fetch_source()
    }

    if (typeof cache === 'string') {
      ElementLogger.verbose(this.qid, 'fetch_source', `Cached SVG found for this src, will parse.`, [this.src, cache])
      return this.parse_svg_string(cache)
    }

    CACHE_ICONS.set(this.src, 'fetching')
    ElementLogger.verbose(this.qid, 'fetch_source', `The src cache value has been set to "fetching".`, [this.src])

    response = await Fetch.get(this.src, { parse: false })
    if (response instanceof Error) return rvp(() => CACHE_ICONS.delete(this.src))

    text = await tcp(() => (response as FetchResponse).text())
    if (text instanceof Error) return rvp(() => CACHE_ICONS.delete(this.src))

    CACHE_ICONS.set(this.src, text)
    ElementLogger.verbose(this.qid, 'fetch_source', `The icon has been cached.`, [this.src, text])

    this.parse_svg_string(text)
  }

  private parse_svg_string(string: string): void {
    let parser: DOMParser, document: Document, element: SVGSVGElement | null

    parser = new DOMParser()
    document = parser.parseFromString(sanitize(string, this.sanitize), 'text/html')

    element = document.querySelector('svg')
    if (!element) return ElementLogger.error(this.qid, 'parse_svg_string', `Failed to find the svg element.`, document)

    this.svg_element = element
    ElementLogger.verbose(this.qid, 'parse_svg_string', `The svg element has been set.`, this.svg_element)
  }

  render() {
    return html`<svg
      fill="${this.fill}"
      stroke="${this.stroke}"
      stroke-width="${this.strokeWidth}"
      style="${styleMap({
        height: getElementStyleCompatibleValue(this.height || this.size),
        maxHeight: getElementStyleCompatibleValue(this.height || this.size),
        maxWidth: getElementStyleCompatibleValue(this.width || this.size),
        minHeight: getElementStyleCompatibleValue(this.height || this.size),
        minWidth: getElementStyleCompatibleValue(this.width || this.size),
        width: getElementStyleCompatibleValue(this.width || this.size)
      })}"
      viewBox="${this.svg_element_viewbox}"
      xmlns="${SVG_NAMESPACE_URI}"
    >
      ${this.svg_element_template}
    </svg>`
  }

  private get svg_element_inner_html(): string {
    return this.svg_element.innerHTML
  }

  private get svg_element_template(): TemplateResult {
    return svg`${unsafeSVG(this.svg_element_inner_html)}`
  }

  private get svg_element_viewbox(): string {
    return this.svg_element.getAttribute('viewbox') || this.svg_element.getAttribute('viewBox') || '0 0 0 0'
  }
}
