import { ID, ID_ALPHABET_HEX_LOWERCASE } from '@queelag/core'
import { LitElement } from 'lit'
import { property } from 'lit/decorators/property.js'
import { Constructor, Layer, Shape, Size } from '../definitions/types'
import { AttributeChangedEvent } from '../events/attribute.changed.event'

interface Interface {
  construct: Function
  layer?: Layer
  name: string
  qid: string
  shape?: Shape
  size?: Size

  isShapeCircle: boolean
}

function Mixin<T extends Constructor<LitElement>>(_LitElement: T) {
  class BaseElement extends _LitElement {
    @property({ type: Number, reflect: true })
    layer?: Layer

    @property({ type: String, reflect: true })
    shape?: Shape

    @property({ type: String, reflect: true })
    size?: Size

    name: string = ''
    qid: string = ''

    construct(name: string): void {
      this.name = name
      this.qid = ID.generate({ alphabet: ID_ALPHABET_HEX_LOWERCASE, prefix: name, size: 16 })
    }

    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
      super.attributeChangedCallback(name, _old, value)

      if (Object.is(_old, value)) {
        return
      }

      this.dispatchEvent(new AttributeChangedEvent(name, _old, value))
    }

    get isShapeCircle(): boolean {
      return this.shape === 'circle'
    }
  }

  return BaseElement as Constructor<Interface> & T
}

export const BaseElement = Mixin(LitElement)
