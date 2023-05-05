export function isStringSVG(string: string): boolean {
  let parser: DOMParser, document: Document, element: SVGSVGElement | null

  parser = new DOMParser()
  document = parser.parseFromString(string, 'text/html')

  element = document.querySelector('svg')
  if (!element) return false

  return true
}
