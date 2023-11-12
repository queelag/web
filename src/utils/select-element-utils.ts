import { DEFAULT_GET_SELECT_OPTION_LABEL, DEFAULT_GET_SELECT_OPTION_VALUE, GetSelectOptionLabel, GetSelectOptionValue } from '../index.js'

export function findSelectOptionByValue<T>(options: T[], value: any, getValue: GetSelectOptionValue<T> = DEFAULT_GET_SELECT_OPTION_VALUE): T | undefined {
  return options.find((option: T) => getValue(option) === value)
}

export function findSelectOptionLabelByValue<T>(
  options: T[],
  value: any,
  getLabel: GetSelectOptionLabel<T> = DEFAULT_GET_SELECT_OPTION_LABEL,
  getValue?: GetSelectOptionValue<T>
): string | undefined {
  let option: T | undefined

  option = findSelectOptionByValue(options, value, getValue)
  if (!option) return undefined

  return getLabel(option)
}
