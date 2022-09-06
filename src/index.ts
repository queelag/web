import type { AvatarElement } from './elements/avatar.element'
import type { BadgeElement } from './elements/badge.element'
import type { ButtonElement } from './elements/button.element'
import type { CheckBoxElement } from './elements/check.box.element'
import type { DividerElement } from './elements/divider.element'
import type { FormElement } from './elements/form.element'
import type { IconElement } from './elements/icon.element'
import type { ImageElement } from './elements/image.element'
import type { InputElement } from './elements/input.element'
import type { InputFileElement } from './elements/input.file.element'
import type { MeterElement } from './elements/meter.element'
import type { SelectElement } from './elements/select.element'
import type { SwitchElement } from './elements/switch.element'
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
    'queelag-form': FormElement
    'queelag-icon': IconElement
    'queelag-image': ImageElement
    'queelag-input': InputElement
    'queelag-input-file': InputFileElement
    'queelag-meter': MeterElement
    'queelag-select': SelectElement
    'queelag-switch': SwitchElement
    'queelag-textarea': TextAreaElement
  }
}

export * from './definitions/attributes'
export { LoggerName as WebLoggerName } from './definitions/enums'
export * from './definitions/interfaces'
export * from './definitions/types'
export * from './elements/avatar.element'
export * from './elements/badge.element'
export * from './elements/button.element'
export * from './elements/check.box.element'
export * from './elements/divider.element'
export * from './elements/form.element'
export * from './elements/icon.element'
export * from './elements/image.element'
export * from './elements/input.element'
export * from './elements/input.file.element'
export * from './elements/meter.element'
export * from './elements/select.element'
export * from './elements/switch.element'
export * from './elements/text.area.element'
export * from './events/attribute.changed.event'
export * from './events/click.async.event'
export * from './events/state.changed.event'
export * from './events/submit.async.event'
export * from './utils/dom.utils'
export * from './utils/element.utils'
export * from './utils/image.utils'
export * from './utils/shape.utils'
export * from './utils/squircle.utils'
export * from './utils/string.utils'
