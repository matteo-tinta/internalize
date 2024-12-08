"use server";

import { FormState } from "../lib/dto/form/form.definitions";
import {
  CreateRoleDto,
  CreateRoleSchema,
} from "../lib/dto/role/createRoleDto.model";
import { roleToDto } from "../lib/dto/role/role-dto.model";
import { action, formAction } from "../lib/helpers/form.helpers";
import { Container } from "../lib/services/container.service";

const addRole = formAction((state: FormState, formData: FormData) =>
    Container(async ({ roleService, formDataValidationService, revalidate }) => {
        const roleServiceAwaited = await roleService

        const data = formDataValidationService.validateForm<CreateRoleDto>(
          CreateRoleSchema,
          formData
        );

        await roleServiceAwaited.addRoleAsync(data.name);

        revalidate.roles();

        return {
          message: "ok",
        };
      }
    )
);

const loadAllRoles = async () => {
  return await Container(async ({ roleService }) => {
    const roleServiceAwaited = await roleService

    const roles = await roleServiceAwaited.all();
    return roles.map(roleToDto);
  });
};

const deleteRole = action(async (role: { name: string }) => {
  const { name } = role;

  return await Container(async ({ roleService, revalidate }) => {
    const roleServiceAwaited = await roleService

    await roleServiceAwaited.deleteRoleAsync(name);
    revalidate.roles();

    return {
      message: `Role ${name} was deleted successfully`
    } as FormState
  });
});

export { loadAllRoles, deleteRole, addRole };
