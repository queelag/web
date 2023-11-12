export interface BaseElement extends HTMLElement {
  id: string
  uid: string
  get name(): string
}

export interface FormControlElement extends BaseElement {
  path?: string
  target?: object
}
