import { StyleInfo } from 'lit-html/directives/style-map'
import { ShapeOptions } from '../definitions/interfaces'
import { Shape } from '../definitions/types'

export function getShapeStyleInfo(shape?: Shape, options?: ShapeOptions): StyleInfo {
  switch (shape) {
    case 'circle':
      return { borderRadius: '9999px' }
    case 'rectangle':
      return { borderRadius: options?.rectangle?.radius }
    case 'square':
      return { borderRadius: options?.square?.radius }
    case 'squircle':
      if (!options?.squircle?.id) {
        return {}
      }

      return { clipPath: `url(#${options.squircle.id})` }
    default:
      return {}
  }
}
