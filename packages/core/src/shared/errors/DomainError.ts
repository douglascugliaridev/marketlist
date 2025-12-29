export class DomainError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
  }

  getStatusCode() {
    return this.statusCode;
  }
}
