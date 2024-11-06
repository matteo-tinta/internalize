"use server";

import { Container } from "../lib/services/container.service";

const loadAllRoles = async () => {
  return await Container(async ({ roleService }) => {
    const roles = await roleService.all();
    return roles.map(r => r.toObject())
  });
};

const deleteRole = async (role: { name: string }) => {
  const { name } = role;

  return await Container(async ({ roleService, revalidate }) => {
    await roleService.deleteRoleAsync(name)

    revalidate.roles()
  });
};

export { loadAllRoles, deleteRole };
