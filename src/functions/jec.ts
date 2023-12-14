import { joinElementClasses } from '../utils/element-utils.js'

export function jec(...classes: any[]): string {
  return joinElementClasses(...classes)
}
