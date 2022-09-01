import type { AvatarElement } from './elements/avatar.element'
import type { BadgeElement } from './elements/badge.element'
import type { ButtonElement } from './elements/button.element'
import type { CheckBoxElement } from './elements/check.box.element'
import type { DividerElement } from './elements/divider.element'
import type { IconElement } from './elements/icon.element'
import type { ImageElement } from './elements/image.element'
import type { InputElement } from './elements/input.element'
import type { MeterElement } from './elements/meter.element'
import type { TextAreaElement } from './elements/text.area.element'

declare global {
  // interface ElementEventMap {
  //   attributechanged: AttributeChangedEvent
  // }
  interface HTMLElementTagNameMap {
    'queelag-avatar': AvatarElement
    'queelag-badge': BadgeElement
    'queelag-button': ButtonElement
    'queelag-checkbox': CheckBoxElement
    'queelag-divider': DividerElement
    'queelag-icon': IconElement
    'queelag-image': ImageElement
    'queelag-input': InputElement
    'queelag-meter': MeterElement
    'queelag-textarea': TextAreaElement
  }
}

export * from './definitions/attributes'
export { LoggerName as WebLoggerName } from './definitions/enums'
export * from './definitions/types'
export * from './elements/avatar.element'
export * from './elements/badge.element'
export * from './elements/button.element'
export * from './elements/check.box.element'
export * from './elements/divider.element'
export * from './elements/icon.element'
export * from './elements/image.element'
export * from './elements/input.element'
export * from './elements/meter.element'
export * from './elements/text.area.element'
export * from './events/attribute.changed.event'
