export function getElementStyleCompatibleValue(value: any): string | undefined {
  switch (typeof value) {
    case 'number':
      return value + 'px'
    case 'string':
      if (/^[0-9.]{1,32}$/.test(value)) {
        return value + 'px'
      }

      return value
    default:
      return undefined
  }
}
