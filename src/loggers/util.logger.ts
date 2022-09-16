import { Logger, LoggerLevel } from '@queelag/core'
import { LoggerName } from '../definitions/enums'

export const UtilLogger: Logger = new Logger(LoggerName.UTIL, LoggerLevel.VERBOSE)
