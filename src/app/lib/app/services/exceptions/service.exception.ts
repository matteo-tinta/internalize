export class ServiceException extends Error {
  constructor(message: string) {
    super(message);
  }
}