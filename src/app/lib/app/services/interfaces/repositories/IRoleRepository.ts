import { Role } from "../../../domain/role/role.domain";

export interface IRoleRepository {
  all: () => Promise<Role[]>
}