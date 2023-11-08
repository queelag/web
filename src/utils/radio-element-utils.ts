import { DEFAULT_GET_RADIO_BUTTON_LABEL, DEFAULT_GET_RADIO_BUTTON_VALUE, GetRadioButtonLabel, GetRadioButtonValue } from '../index.js'

export function findRadioButtonByValue<T>(options: T[], value: any, getValue: GetRadioButtonValue<T> = DEFAULT_GET_RADIO_BUTTON_VALUE): T | undefined {
  return options.find((option: T) => getValue(option) === value)
}

export function findRadioButtonLabelByValue<T>(
  options: T[],
  value: any,
  getLabel: GetRadioButtonLabel<T> = DEFAULT_GET_RADIO_BUTTON_LABEL,
  getValue?: (option: T) => any
): string | undefined {
  let option: T | undefined

  option = findRadioButtonByValue(options, value, getValue)
  if (!option) return undefined

  return getLabel(option)
}
