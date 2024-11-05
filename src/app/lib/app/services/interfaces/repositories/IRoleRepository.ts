import { RoleType } from "../../../domain/role/role.domain";

export interface IRoleRepository {
  deleteRoleAsync(actualDbRole: RoleType): Promise<void>;
  addRoleAsync(role: RoleType): Promise<void>;
  getRoleByNameAsync(name: string): Promise<RoleType | null>;
  all: () => Promise<RoleType[]>
}