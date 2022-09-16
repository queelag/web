import { Logger, LoggerLevel } from '@queelag/core'
import { LoggerName } from '../definitions/enums'

export const ElementLogger: Logger = new Logger(LoggerName.ELEMENT, LoggerLevel.VERBOSE)
