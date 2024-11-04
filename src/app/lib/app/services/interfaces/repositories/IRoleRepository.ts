import { Role } from "../../../domain/role/role.domain";

export interface IRoleRepository {
  deleteRoleAsync(actualDbRole: Role): Promise<void>;
  addRoleAsync(role: Role): Promise<void>;
  getRoleByNameAsync(name: string): Promise<Role | undefined>;
  all: () => Promise<Role[]>
}