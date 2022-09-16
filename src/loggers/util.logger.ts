import { LoggerName } from '@/definitions/enums'
import { Logger, LoggerLevel } from '@queelag/core'

export const UtilLogger: Logger = new Logger(LoggerName.UTIL, LoggerLevel.VERBOSE)
