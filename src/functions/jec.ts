import { joinElementClasses } from '../index.js'

export function jec(...classes: any[]): string {
  return joinElementClasses(...classes)
}
