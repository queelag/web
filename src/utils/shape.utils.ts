import { ShapeOptions } from '@/definitions/interfaces'
import { Shape } from '@/definitions/types'
import { StyleInfo } from 'lit-html/directives/style-map'
import { getElementStyleCompatibleValue } from './element.utils'

export function getShapeStyleInfo(shape?: Shape, options?: ShapeOptions): StyleInfo {
  switch (shape) {
    case 'circle':
      return { borderRadius: '9999px' }
    case 'rectangle':
      return { borderRadius: getElementStyleCompatibleValue(options?.rectangle?.radius) }
    case 'square':
      return { borderRadius: getElementStyleCompatibleValue(options?.square?.radius) }
    case 'squircle':
      if (!options?.squircle?.id) {
        return {}
      }

      return { clipPath: `url(#${options.squircle.id})` }
    default:
      return {}
  }
}
