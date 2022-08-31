import type { AvatarElement } from './elements/avatar.element'
import type { ButtonElement } from './elements/button.element'
import type { CheckBoxElement } from './elements/check.box.element'
import type { IconElement } from './elements/icon.element'
import type { ImageElement } from './elements/image.element'
import type { InputElement } from './elements/input.element'
import type { AttributeChangedEvent } from './events/attribute.changed.event'

declare global {
  interface ElementEventMap {
    attributechanged: AttributeChangedEvent
  }
  interface HTMLElementTagNameMap {
    'queelag-avatar': AvatarElement
    'queelag-button': ButtonElement
    'queelag-checkbox': CheckBoxElement
    'queelag-icon': IconElement
    'queelag-image': ImageElement
    'queelag-input': InputElement
  }
}

export * from './definitions/attributes'
export { LoggerName as WebLoggerName } from './definitions/enums'
export * from './definitions/types'
export * from './elements/avatar.element'
export * from './elements/button.element'
export * from './elements/check.box.element'
export * from './elements/icon.element'
export * from './elements/image.element'
export * from './elements/input.element'
export * from './events/attribute.changed.event'
