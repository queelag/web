export class CloseEvent extends CustomEvent<void> {
  constructor() {
    super('close')
  }
}
