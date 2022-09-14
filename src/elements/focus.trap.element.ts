import { createFocusTrap, FocusTarget, FocusTargetOrFalse, FocusTrap, Options } from 'focus-trap'
import { CustomElement } from '../decorators/custom.element'
import { Property } from '../decorators/property'
import { ElementName } from '../definitions/enums'
import {
  FocusTrapAllowOutsideClick,
  FocusTrapCheckCanFocusTrap,
  FocusTrapCheckCanReturnFocus,
  FocusTrapClickOutsideDeactivates,
  FocusTrapDisplayCheck,
  FocusTrapEscapeDeactivates,
  FocusTrapSetReturnFocus
} from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

@CustomElement('q-focus-trap')
export class FocusTrapElement extends BaseElement {
  @Property({ attribute: 'allow-outside-click' })
  allowOutsideClick?: FocusTrapAllowOutsideClick

  @Property({ type: Object, attribute: 'check-can-focus-trap' })
  checkCanFocusTrap?: FocusTrapCheckCanFocusTrap

  @Property({ type: Object, attribute: 'check-can-return-focus' })
  checkCanReturnFocus?: FocusTrapCheckCanReturnFocus

  @Property({ attribute: 'click-outside-deactivates' })
  clickOutsideDeactivates?: FocusTrapClickOutsideDeactivates

  @Property({ type: Boolean, attribute: 'delay-initial-focus' })
  delayInitialFocus?: boolean

  @Property({ type: String, attribute: 'display-check' })
  displayCheck?: FocusTrapDisplayCheck

  // @Property({ type: Object, attribute: 'document' })
  // document?: Document

  @Property({ attribute: 'escape-deactivates' })
  escapeDeactivates?: FocusTrapEscapeDeactivates

  @Property({ attribute: 'fallback-focus' })
  fallbackFocus?: FocusTarget

  // @Property({ attribute: 'get-shadow-root' })
  // getShadowRoot?: FocusTrapGetShadowRoot

  @Property({ attribute: 'initial-focus' })
  initialFocus?: FocusTargetOrFalse

  @Property({ type: Boolean, attribute: 'prevent-scroll' })
  preventScroll?: boolean

  @Property({ type: Boolean, attribute: 'return-focus-on-deactivate' })
  returnFocusOnDeactivate?: boolean

  @Property({ attribute: 'set-return-focus' })
  setReturnFocus?: FocusTrapSetReturnFocus

  protected focusTrap!: FocusTrap

  connectedCallback(): void {
    super.connectedCallback()
    this.createFocusTrap()
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.deactivateFocusTrap()
  }

  createFocusTrap(): void {
    this.focusTrap = createFocusTrap(this, this.focusTrapOptions)
    ElementLogger.verbose(this.uid, 'createFocusTrap', `The focus trap has been created.`, this.focusTrap, this.focusTrapOptions)
  }

  activateFocusTrap(): void {
    this.focusTrap.activate()
    ElementLogger.verbose(this.uid, 'activateFocusTrap', `The focus trap has been activated.`)
  }

  deactivateFocusTrap(): void {
    this.focusTrap.deactivate()
    ElementLogger.verbose(this.uid, 'deactivateFocusTrap', `The focus trap has been deactivated.`)
  }

  onFocusTrapActivate = (): void => {
    this.dispatchEvent(new Event('focus-trap-activate'))
  }

  onFocusTrapDeactivate = (): void => {
    this.dispatchEvent(new Event('focus-trap-deactivate'))
  }

  onFocusTrapPostActivate = (): void => {
    this.dispatchEvent(new Event('focus-trap-post-activate'))
  }

  onFocusTrapPostDeactivate = (): void => {
    this.dispatchEvent(new Event('focus-trap-post-deactivate'))
  }

  get focusTrapOptions(): Options {
    let options: Options

    options = {
      allowOutsideClick: typeof this.allowOutsideClick !== 'undefined' ? this.allowOutsideClick : true,
      checkCanFocusTrap: this.checkCanFocusTrap,
      checkCanReturnFocus: this.checkCanReturnFocus,
      clickOutsideDeactivates: this.clickOutsideDeactivates,
      delayInitialFocus: this.delayInitialFocus,
      // document: this.document,
      escapeDeactivates: this.escapeDeactivates,
      fallbackFocus: this.fallbackFocus,
      initialFocus: this.initialFocus,
      onActivate: this.onFocusTrapActivate,
      onDeactivate: this.onFocusTrapDeactivate,
      onPostActivate: this.onFocusTrapPostActivate,
      onPostDeactivate: this.onFocusTrapPostDeactivate,
      preventScroll: this.preventScroll,
      returnFocusOnDeactivate: this.returnFocusOnDeactivate,
      setReturnFocus: this.setReturnFocus,
      tabbableOptions: {
        displayCheck: this.displayCheck,
        // getShadowRoot: typeof this.getShadowRoot !== 'undefined' ? this.getShadowRoot : true
        getShadowRoot: true
      }
    }

    for (let key in options) {
      // @ts-ignore
      typeof options[key] === 'undefined' && delete options[key]
    }

    for (let key in options.tabbableOptions) {
      // @ts-ignore
      typeof options.tabbableOptions[key] === 'undefined' && delete options.tabbableOptions[key]
    }

    return options
  }

  get name(): ElementName {
    return ElementName.FOCUS_TRAP
  }
}
