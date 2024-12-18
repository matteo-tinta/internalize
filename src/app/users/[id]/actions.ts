"use server";

import { FormState } from "@/app/lib/dto/form/form.definitions";
import {
  AddRoleToUserDto,
  AddRoleToUserSchema,
} from "@/app/lib/dto/role/addRoleToUserDto";
import {
  RemoveRoleFromUserDto,
  RemoveRoleFromUserDtoSchema,
} from "@/app/lib/dto/role/removeRoleFromUserDto";
import { roleToDto } from "@/app/lib/dto/role/role-dto.model";
import { action, formAction } from "@/app/lib/helpers/form.helpers";
import { Container } from "@/app/lib/services/container.service";
import { loadAllRoles } from "@/app/roles/actions";

const loadPageData = async (userId: string) => {
  return {
    userRoles: (await loadRolesByUserId(userId)) ?? [],
    allRoles: (await loadAllRoles()) ?? [],
  };
};

const loadRolesByUserId = async (userId: string) => {
  return await Container(async ({ roleService }) => {
    const roleServiceAwaited = await roleService

    const roles = await roleServiceAwaited.getRolesByUserId(userId);
    return roles.map(roleToDto);
  });
};

const addRoleToUser = formAction(async (state, formData) => {
  return await Container(
    async ({ revalidate, formDataValidationService, roleService }) => {
      const roleServiceAwaited = await roleService

      const value = formDataValidationService.validateForm<AddRoleToUserDto>(
        AddRoleToUserSchema,
        formData
      );

      await roleServiceAwaited.addRoleToUserAsync(value.userId, value.role);

      revalidate.userRoles(value.userId);

      return {
        message: `Role ${value.role} was correctly added to ${value.userId}`,
      } as FormState;
    }
  );
});

const removeRoleFromUser = action(async (props: {userId: string, role: string}) => {
  return await Container(
    async ({ revalidate, formDataValidationService, roleService }) => {
      const roleServiceAwaited = await roleService

      const { userId, role } =
        formDataValidationService.validate<RemoveRoleFromUserDto>(
          RemoveRoleFromUserDtoSchema,
          props
        );

      await roleServiceAwaited.removeRoleFromUser(userId, role);

      revalidate.userRoles(userId);

      return {
        message: `Role ${role} was removed from ${userId}`,
      } as FormState;
    }
  );
});

export { addRoleToUser, loadRolesByUserId, loadPageData, removeRoleFromUser };
