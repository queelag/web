import { Logger, LoggerLevel } from '@aracna/core'
import { LoggerName } from '../definitions/enums'

export const ElementLogger: Logger = new Logger(LoggerName.ELEMENT, LoggerLevel.VERBOSE)
