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
  FocusTrapGetShadowRoot,
  FocusTrapSetReturnFocus
} from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

@CustomElement('queelag-focus-trap')
export class FocusTrapElement extends BaseElement {
  @Property({ attribute: 'focus-trap-allow-outside-click' })
  focus_trap_allow_outside_click?: FocusTrapAllowOutsideClick

  @Property({ type: Object, attribute: 'focus-trap-check-can-focus-trap' })
  focus_trap_check_can_focus_trap?: FocusTrapCheckCanFocusTrap

  @Property({ type: Object, attribute: 'focus-trap-check-can-return-focus' })
  focus_trap_check_can_return_focus?: FocusTrapCheckCanReturnFocus

  @Property({ attribute: 'focus-trap-click-outside-deactivates' })
  focus_trap_click_outside_deactivates?: FocusTrapClickOutsideDeactivates

  @Property({ type: Boolean, attribute: 'focus-trap-delay-initial-focus' })
  focus_trap_delay_initial_focus?: boolean

  @Property({ type: String, attribute: 'focus-trap-display-check' })
  focus_trap_display_check?: FocusTrapDisplayCheck

  @Property({ type: Object, attribute: 'focus-trap-document' })
  focus_trap_document?: Document

  @Property({ attribute: 'focus-trap-escape-deactivates' })
  focus_trap_escape_deactivates?: FocusTrapEscapeDeactivates

  @Property({ attribute: 'focus-trap-fallback-focus' })
  focus_trap_fallback_focus?: FocusTarget

  @Property({ attribute: 'focus-trap-get-shadow-root' })
  focus_trap_get_shadow_root?: FocusTrapGetShadowRoot

  @Property({ attribute: 'focus-trap-initial-focus' })
  focus_trap_initial_focus?: FocusTargetOrFalse

  @Property({ type: Boolean, attribute: 'focus-trap-prevent-scroll' })
  focus_trap_prevent_scroll?: boolean

  @Property({ type: Boolean, attribute: 'focus-trap-return-focus-on-deactivate' })
  focus_trap_return_focus_on_deactivate?: boolean

  @Property({ attribute: 'focus-trap-set-return-focus' })
  focus_trap_set_return_focus?: FocusTrapSetReturnFocus

  protected focus_trap!: FocusTrap

  connectedCallback(): void {
    super.connectedCallback()
    this.createFocusTrap()
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.deactivateFocusTrap()
  }

  createFocusTrap(): void {
    this.focus_trap = createFocusTrap(this, this.focus_trap_options)
    ElementLogger.verbose(this.uid, 'createFocusTrap', `The focus trap has been created.`, this.focus_trap)
  }

  activateFocusTrap(): void {
    this.focus_trap.activate()
    ElementLogger.verbose(this.uid, 'activateFocusTrap', `The focus trap has been activated.`)
  }

  deactivateFocusTrap(): void {
    this.focus_trap.deactivate()
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

  onSlotChange(): void {
    super.onSlotChange()
    this.activateFocusTrap()
  }

  get focus_trap_options(): Options {
    return {
      allowOutsideClick: this.focus_trap_allow_outside_click || true,
      checkCanFocusTrap: this.focus_trap_check_can_focus_trap,
      checkCanReturnFocus: this.focus_trap_check_can_return_focus,
      clickOutsideDeactivates: this.focus_trap_click_outside_deactivates,
      delayInitialFocus: this.focus_trap_delay_initial_focus,
      document: this.focus_trap_document,
      escapeDeactivates: this.focus_trap_escape_deactivates,
      fallbackFocus: this.focus_trap_fallback_focus,
      initialFocus: this.focus_trap_initial_focus,
      onActivate: this.onFocusTrapActivate,
      onDeactivate: this.onFocusTrapDeactivate,
      onPostActivate: this.onFocusTrapPostActivate,
      onPostDeactivate: this.onFocusTrapPostDeactivate,
      preventScroll: this.focus_trap_prevent_scroll,
      returnFocusOnDeactivate: this.focus_trap_return_focus_on_deactivate,
      setReturnFocus: this.focus_trap_set_return_focus,
      tabbableOptions: { displayCheck: this.focus_trap_display_check, getShadowRoot: this.focus_trap_get_shadow_root }
    }
  }

  get name(): ElementName {
    return ElementName.FOCUS_TRAP
  }
}
