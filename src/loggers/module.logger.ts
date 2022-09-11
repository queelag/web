import { Logger, LoggerLevel } from '@queelag/core'
import { LoggerName } from '../definitions/enums'

export const ModuleLogger: Logger = new Logger(LoggerName.MODULE, LoggerLevel.VERBOSE)
