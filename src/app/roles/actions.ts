"use server";

import { Container } from "../lib/services/container.service";

const loadAllRoles = async () => {
  return await Container(async ({ roleService }) => {
    return await roleService.all();
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
