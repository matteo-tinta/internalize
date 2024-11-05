import { IUnitOfWorkRepository } from "./_interfaces/repositories/IUowRepository"

export class BaseService {
  constructor(protected uof: IUnitOfWorkRepository) {}
}