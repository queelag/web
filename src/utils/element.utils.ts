export function joinElementClasses(...classes: any[]): string {
  return classes.filter(Boolean).join(' ')
}
