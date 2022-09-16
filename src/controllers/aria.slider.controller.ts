import { DEFAULT_SLIDER_MAXIMUM, DEFAULT_SLIDER_MINIMUM, DEFAULT_SLIDER_ORIENTATION, DEFAULT_SLIDER_THUMB_VALUE } from '@/definitions/constants'
import type { AriaSliderThumbElement } from '@/elements/aria/aria.slider.element'
import { setImmutableElementAttribute } from '@/utils/element.utils'
import { ReactiveController, ReactiveControllerHost } from 'lit'

export class AriaSliderController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    // setImmutableElementAttribute(this.host, 'aria-labelledby', '')
    setImmutableElementAttribute(this.host, 'role', 'group')
  }
}

export class AriaSliderThumbController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaSliderThumbElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    // setImmutableElementAttribute(this.host, 'aria-labelledby', '')
    setImmutableElementAttribute(this.host, 'aria-orientation', this.host.rootElement.orientation ?? DEFAULT_SLIDER_ORIENTATION)
    setImmutableElementAttribute(this.host, 'aria-valuemax', String(this.host.rootElement.maximum ?? DEFAULT_SLIDER_MAXIMUM))
    setImmutableElementAttribute(this.host, 'aria-valuemin', String(this.host.rootElement.minimum ?? DEFAULT_SLIDER_MINIMUM))
    setImmutableElementAttribute(this.host, 'aria-valuenow', String(this.host.value ?? DEFAULT_SLIDER_THUMB_VALUE))
    setImmutableElementAttribute(this.host, 'role', 'slider')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}
