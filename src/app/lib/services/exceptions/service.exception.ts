export class ServiceException extends Error {
  constructor(message: string) {
    super(message);
    console.trace({
      type: ServiceException.prototype.name,
      message
    })
  }
}