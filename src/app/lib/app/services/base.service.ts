import { IUnitOfWorkRepository } from "./interfaces/repositories/IUowRepository"

export class BaseService {
  constructor(protected uof: IUnitOfWorkRepository) {}
}