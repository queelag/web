import { sleep } from '@aracna/core'
import { ModuleLogger } from '../loggers/module.logger'

export class VisibilityController {
  private data: Map<string, string> = new Map()

  /**
   * Sets name to HIDING, after delay time sets name to HIDDEN.
   */
  async hide(name: string, delay: number = 0): Promise<void> {
    if (this.isHidden(name)) {
      return ModuleLogger.warn('VisibilityController', 'hide', `The key ${name} is already hidden.`)
    }

    this.data.set(name, VisibilityController.HIDING)
    ModuleLogger.verbose('VisibilityController', 'hide', `The key ${name} is hiding.`)

    await sleep(delay)

    this.data.set(name, VisibilityController.HIDDEN)
    ModuleLogger.verbose('VisibilityController', 'hide', `The key ${name} is hidden.`)
  }

  /**
   * Sets name to VISIBLE, after delay time sets name to SHOWING.
   */
  async show(name: string, delay: number = 0): Promise<void> {
    if (this.isVisible(name)) {
      return ModuleLogger.warn('VisibilityController', 'show', `The key ${name} is already visible.`)
    }

    this.data.set(name, VisibilityController.SHOWING)
    ModuleLogger.verbose('VisibilityController', 'hide', `The key ${name} is showing.`)

    await sleep(delay)

    this.data.set(name, VisibilityController.VISIBLE)
    ModuleLogger.verbose('VisibilityController', 'hide', `The key ${name} is visible.`)
  }

  /**
   * Shows name if it's hidden or hides it if it's shown.
   */
  async toggle(name: string, delay: number = 0): Promise<void> {
    if (this.isHidden(name)) {
      return this.show(name, delay)
    }

    return this.hide(name, delay)
  }

  clear(): void {
    this.data.clear()
    ModuleLogger.verbose('VisibilityController', 'clear', `The data has been cleared.`)
  }

  private get(name: string): string {
    return this.data.get(name) ?? VisibilityController.HIDDEN
  }

  /**
   * Checks if name is HIDDEN.
   */
  isHidden(name: string): boolean {
    return this.get(name) === VisibilityController.HIDDEN
  }

  /**
   * Checks if name is HIDING.
   */
  isHiding(name: string): boolean {
    return this.get(name) === VisibilityController.HIDING
  }

  /**
   * Checks if name is SHOWING.
   */
  isShowing(name: string): boolean {
    return this.get(name) === VisibilityController.SHOWING
  }

  /**
   * Checks if name is VISIBLE.
   */
  isVisible(name: string): boolean {
    return this.get(name) === VisibilityController.VISIBLE
  }

  get hasHidden(): boolean {
    return [...this.data.values()].includes(VisibilityController.HIDDEN)
  }

  get hasHiding(): boolean {
    return [...this.data.values()].includes(VisibilityController.HIDING)
  }

  get hasShowing(): boolean {
    return [...this.data.values()].includes(VisibilityController.SHOWING)
  }

  get hasVisible(): boolean {
    return [...this.data.values()].includes(VisibilityController.VISIBLE)
  }

  private static get HIDDEN(): string {
    return 'HIDDEN'
  }

  private static get HIDING(): string {
    return 'HIDING'
  }

  private static get SHOWING(): string {
    return 'SHOWING'
  }

  private static get VISIBLE(): string {
    return 'VISIBLE'
  }
}
