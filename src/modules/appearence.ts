import { Environment, isNotError, noop, Storage } from '@queelag/core'
import { StorageName } from '../definitions/enums'
import { Theme } from '../definitions/types'
import { ModuleLogger } from '../loggers/module.logger'
import { LocalStorage } from './local.storage'

export class Appearence {
  storage: Storage
  theme: Theme

  constructor(onChangeTheme: (theme: Theme) => any = noop, theme: Theme = 'system', storage: Storage = LocalStorage) {
    this.storage = storage
    this.theme = theme

    this.onChangeTheme = onChangeTheme

    this.registerThemeEventListener()
  }

  onChangeTheme(theme: Theme): any {}

  async initialize(): Promise<boolean> {
    let copied: void | Error

    this.setTheme('system')

    copied = await this.storage.copy(StorageName.APPEARENCE, this, ['theme'])
    if (copied instanceof Error) return false

    this.setTheme(this.theme)

    return true
  }

  toggleTheme(): void {
    switch (this.theme) {
      case 'dark':
        return this.setTheme('light')
      case 'light':
        return this.setTheme('dark')
      case 'system':
        return this.setTheme(this.themeByPrefersColorScheme === 'dark' ? 'light' : 'dark')
    }
  }

  setTheme(theme: Theme): void {
    this.theme = theme
    ModuleLogger.verbose('Appearance', 'setTheme', `The theme has been set to ${theme}.`)

    switch (theme) {
      case 'dark':
      case 'light':
        this.onChangeTheme(theme)
        break
      case 'system':
        this.onChangeTheme(this.themeByPrefersColorScheme)
        break
    }
  }

  async store(): Promise<boolean> {
    return isNotError(await this.storage.set(StorageName.APPEARENCE, this, ['theme']))
  }

  private registerThemeEventListener(): void {
    let media: MediaQueryList

    if (Environment.isWindowNotDefined) {
      return ModuleLogger.warn('Appearance', 'registerThemeEventListener', `The window is not defined.`)
    }

    if (typeof window.matchMedia === 'undefined') {
      return ModuleLogger.warn('Appearance', 'registerThemeEventListener', `The window.matchMedia function is not defined.`)
    }

    media = window.matchMedia('(prefers-color-scheme: dark)')
    if (typeof media.addEventListener !== 'function')
      return ModuleLogger.warn('Appearance', 'registerThemeEventListener', `The window.matchMedia.addEventListener function is not defined.`)

    media.addEventListener('change', (v: MediaQueryListEvent) => this.isThemeSystem && this.setTheme('system'))
  }

  get themeByPrefersColorScheme(): Theme {
    if (Environment.isWindowNotDefined) {
      ModuleLogger.warn('Appearance', 'themeByPrefersColorScheme', `window is not defined.`)
      return 'light'
    }

    if (typeof window.matchMedia === 'undefined') {
      ModuleLogger.warn('Appearance', 'themeByPrefersColorScheme', `window.matchMedia is not defined.`)
      return 'light'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  get isThemeDark(): boolean {
    switch (this.theme) {
      case 'dark':
        return true
      case 'light':
        return false
      case 'system':
        return this.themeByPrefersColorScheme === 'dark'
    }
  }

  get isThemeLight(): boolean {
    switch (this.theme) {
      case 'dark':
        return false
      case 'light':
        return true
      case 'system':
        return this.themeByPrefersColorScheme === 'light'
    }
  }

  get isThemeSystem(): boolean {
    return this.theme === 'system'
  }
}
