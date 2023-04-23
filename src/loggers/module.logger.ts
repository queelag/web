import { Logger, LoggerLevel } from '@aracna/core'
import { LoggerName } from '../definitions/enums'

export const ModuleLogger: Logger = new Logger(LoggerName.MODULE, LoggerLevel.VERBOSE)
