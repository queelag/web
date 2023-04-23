import { Logger, LoggerLevel } from '@aracna/core'
import { LoggerName } from '../definitions/enums'

export const UtilLogger: Logger = new Logger(LoggerName.UTIL, LoggerLevel.VERBOSE)
