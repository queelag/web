import { LoggerName } from '@/definitions/enums'
import { Logger, LoggerLevel } from '@queelag/core'

export const ElementLogger: Logger = new Logger(LoggerName.ELEMENT, LoggerLevel.VERBOSE)
