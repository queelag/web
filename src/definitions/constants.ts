import type { WebSocketTransformMessageData, WebSocketTransformSendData } from './types.js'

/**
 * ImageElement
 */
/** */
export const CACHE_IMAGES: Map<string, string> = new Map()

/**
 * WebSocket
 */
/** */
export const DEFAULT_WEB_SOCKET_BINARY_TYPE: BinaryType = 'blob'
export const DEFAULT_WEB_SOCKET_TRANSFORM_MESSAGE_DATA: WebSocketTransformMessageData<any> = async (data: any) => data
export const DEFAULT_WEB_SOCKET_TRANSFORM_SEND_DATA: WebSocketTransformSendData<any> = async (data: any) => data
