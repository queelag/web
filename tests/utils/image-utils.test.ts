import { beforeEach, describe, it } from 'vitest'
import { DEFAULT_IMAGE_SRC } from '../../src'

describe('Image Utils', () => {
  let image: HTMLImageElement

  beforeEach(() => {
    image = new Image()
    image.src = DEFAULT_IMAGE_SRC
    // image.src = 'https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/1:1/w_256,h_256,c_limit/1521-WIRED-Cat.jpeg'
  })

  it('caches image element', () => {
    // to be written
  })

  it('caches image src', () => {
    // to be written
  })

  it('gets image element base64', async () => {
    // to be written
  })
})
