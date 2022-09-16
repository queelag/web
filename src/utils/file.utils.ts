import { QueelagFile } from '@/classes/queelag.file'
import { DeserializeFileOptions } from '@/definitions/interfaces'

export async function deserializeFile(file: File, options?: DeserializeFileOptions): Promise<QueelagFile> {
  let item: QueelagFile = new QueelagFile(file)

  if (options?.resolve?.arrayBuffer) {
    await item.resolveArrayBuffer()
  }

  if (options?.resolve?.text) {
    await item.resolveText()
  }

  return item
}
