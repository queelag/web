import { SelectOption } from '../index.js'

export function findSelectOptionByValue(options: SelectOption[], value: any): SelectOption | undefined {
  return options.find((option: SelectOption) => option.value === value)
}

export function findSelectOptionLabelByValue(options: SelectOption[], value: any): string | undefined {
  return findSelectOptionByValue(options, value)?.label
}
