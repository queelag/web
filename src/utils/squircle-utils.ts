import { ID } from '@aracna/core'
import { DEFAULT_SQUIRCLE_CURVATURE, ELEMENT_UID_GENERATE_OPTIONS, SQUIRCLES_CONTAINER_ID, SVG_NAMESPACE_URI } from '../definitions/constants.js'
import { ElementName } from '../definitions/enums.js'

export function appendSquircleElement(size: number, curvature: number = DEFAULT_SQUIRCLE_CURVATURE): void {
  let container: HTMLElement, element: SVGSVGElement | null

  container = getSquirclesContainer()

  element = container.querySelector(`svg[size="${size}"][curvature="${curvature}"]`)
  if (element) return

  element = createSquircleElement(size, curvature)

  container.append(element)
}

export function createSquircleElement(size: number, curvature: number = DEFAULT_SQUIRCLE_CURVATURE): SVGSVGElement {
  let d: string, transform: string, viewbox: string, svg: SVGSVGElement | null, clipath: SVGClipPathElement, path: SVGPathElement

  d = getSquirclePathD(size, curvature)
  transform = getSquirclePathTransform(size)
  viewbox = getSquircleViewBox(size)

  svg = document.createElementNS(SVG_NAMESPACE_URI, 'svg')
  svg.setAttribute('curvature', curvature.toString())
  svg.setAttribute('fill', 'black')
  svg.setAttribute('id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.SQUIRCLE }))
  svg.setAttribute('size', size.toString())
  svg.setAttribute('viewBox', viewbox)
  svg.setAttribute('xmlns', SVG_NAMESPACE_URI)

  clipath = document.createElementNS(SVG_NAMESPACE_URI, 'clipPath')
  clipath.setAttribute('id', getSquircleClipPathID(size, curvature))

  path = document.createElementNS(SVG_NAMESPACE_URI, 'path')
  path.setAttribute('d', d)
  path.setAttribute('transform', transform)

  clipath.append(path)
  svg.append(clipath)

  return svg
}

export function getSquircleViewBox(size: number): string {
  return `0 0 ${size} ${size}`
}

export function getSquircleClipPathID(size: number, curvature: number = DEFAULT_SQUIRCLE_CURVATURE): string {
  return `${ElementName.SQUIRCLE_CLIP_PATH}_${size}_${curvature}`.replace(/\./g, '')
}

export function getSquirclePathD(size: number, curvature: number): string {
  let arc: number, d: string

  arc = Math.min(size / 2, size / 2) * (1 - curvature)
  d = `
    M 0 ${size / 2}
    C 0 ${arc}, ${arc} 0, ${size / 2} 0
    S ${size} ${arc}, ${size} ${size / 2}, ${size - arc} ${size}
      ${size / 2} ${size}, 0 ${size - arc}, 0 ${size / 2}
  `
  d = d.replace(/\s{2,16}/g, ' ').trim()

  return d
}

export function getSquirclePathTransform(size: number): string {
  return `rotate(${0}, ${size / 2}, ${size / 2}) translate(${(size - size) / 2}, ${(size - size) / 2})`
}

export function getSquirclesContainer(): HTMLElement {
  let element: HTMLElement | null

  element = document.getElementById(SQUIRCLES_CONTAINER_ID)
  if (element) return element

  element = document.createElement('div')
  element.setAttribute('id', SQUIRCLES_CONTAINER_ID)

  element.style.height = '0px'
  element.style.opacity = '0'
  element.style.pointerEvents = 'none'
  element.style.position = 'absolute'
  element.style.width = '0px'

  document.body.append(element)

  return element
}
