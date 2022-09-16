import { LoggerName } from '@/definitions/enums'
import { Logger, LoggerLevel } from '@queelag/core'

export const ModuleLogger: Logger = new Logger(LoggerName.MODULE, LoggerLevel.VERBOSE)
