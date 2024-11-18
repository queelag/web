export type CanvasDataURLType = 'image/jpeg' | 'image/png' | 'image/webp'

export type ElementAttributeValue = string | null | undefined

export type WebSocketEventData<T extends object = object> = T | ArrayBufferLike | ArrayBufferView | Blob | string
export type WebSocketTransformMessageData<T extends object = object> = (data: WebSocketEventData<T>) => Promise<WebSocketEventData<T>>
export type WebSocketTransformSendData<T extends object = object> = (data: WebSocketEventData<T>) => Promise<WebSocketEventData<T>>
