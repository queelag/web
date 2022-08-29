import type { ButtonElement } from './elements/button.element'
import type { IconElement } from './elements/icon.element'
import type { ImageElement } from './elements/image.element'
import type { AttributeChangedEvent } from './events/attribute.changed.event'

declare global {
  interface ElementEventMap {
    attributechanged: AttributeChangedEvent
  }
  interface HTMLElementTagNameMap {
    'queelag-button': ButtonElement
    'queelag-icon': IconElement
    'queelag-image': ImageElement
  }
}

export * from './definitions/attributes'
export { LoggerName as WebLoggerName } from './definitions/enums'
export * from './definitions/types'
export * from './elements/button.element'
export * from './elements/icon.element'
export * from './elements/image.element'
export * from './events/attribute.changed.event'
