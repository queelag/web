import { ModuleLogger } from '../loggers/module.logger'

export class VisibilityController {
  private static data: Map<string, number> = new Map()

  /**
   * Sets name to HIDING, after delay time sets name to HIDDEN.
   */
  static hide(name: string, delay: number = 0): void {
    if (VisibilityController.isHidden(name)) {
      return ModuleLogger.warn('VisibilityController', 'hide', `The key ${name} is already hidden.`)
    }

    VisibilityController.data.set(name, VisibilityController.HIDING)
    ModuleLogger.verbose('VisibilityController', 'hide', `The key ${name} is hiding.`)

    setTimeout(() => {
      VisibilityController.data.set(name, VisibilityController.HIDDEN)
      ModuleLogger.verbose('VisibilityController', 'hide', `The key ${name} is hidden.`)
    }, delay)
  }

  /**
   * Sets name to VISIBLE, after delay time sets name to SHOWING.
   */
  static show(name: string, delay: number = 0): void {
    if (VisibilityController.isVisible(name)) {
      return ModuleLogger.warn('VisibilityController', 'show', `The key ${name} is already visible.`)
    }

    VisibilityController.data.set(name, VisibilityController.SHOWING)
    ModuleLogger.verbose('VisibilityController', 'hide', `The key ${name} is showing.`)

    setTimeout(() => {
      VisibilityController.data.set(name, VisibilityController.VISIBLE)
      ModuleLogger.verbose('VisibilityController', 'hide', `The key ${name} is visible.`)
    }, delay)
  }

  /**
   * Shows name if it's hidden or hides it if it's shown.
   */
  static toggle(name: string, delay: number = 0): void {
    if (VisibilityController.isHidden(name)) {
      return VisibilityController.show(name, delay)
    }

    return VisibilityController.hide(name, delay)
  }

  private static get(name: string): number {
    return VisibilityController.data.get(name) || VisibilityController.HIDDEN
  }

  /**
   * Checks if name is HIDDEN.
   */
  static isHidden(name: string): boolean {
    return VisibilityController.get(name) === VisibilityController.HIDDEN
  }

  /**
   * Checks if name is HIDING.
   */
  static isHiding(name: string): boolean {
    return VisibilityController.get(name) === VisibilityController.HIDING
  }

  /**
   * Checks if name is SHOWING.
   */
  static isShowing(name: string): boolean {
    return VisibilityController.get(name) === VisibilityController.SHOWING
  }

  /**
   * Checks if name is VISIBLE.
   */
  static isVisible(name: string): boolean {
    return VisibilityController.get(name) === VisibilityController.VISIBLE
  }

  static get hasHidden(): boolean {
    return [...VisibilityController.data.values()].includes(VisibilityController.HIDDEN)
  }

  static get hasHiding(): boolean {
    return [...VisibilityController.data.values()].includes(VisibilityController.HIDING)
  }

  static get hasShowing(): boolean {
    return [...VisibilityController.data.values()].includes(VisibilityController.SHOWING)
  }

  static get hasVisible(): boolean {
    return [...VisibilityController.data.values()].includes(VisibilityController.VISIBLE)
  }

  private static get HIDDEN(): number {
    return 0
  }

  private static get HIDING(): number {
    return 1
  }

  private static get SHOWING(): number {
    return 2
  }

  private static get VISIBLE(): number {
    return 3
  }
}
