"use server";

import { action, formAction } from "@/app/lib/helpers/form.helpers";
import { Container } from "@/app/lib/services/container.service";
import { actionToDto } from "@/app/lib/dto/action/action.model";
import { IAction } from "@/app/lib/domain/action/action";
import { listActions } from "@/app/actions/actions";
import { FormState } from "@/app/lib/dto/form/form.definitions";
import {
  AddActionToRoleSchema,
  AddActionToRoleDto,
} from "@/app/lib/dto/action/addActionToRole";
import {
  RemoveActionFromRoleDto,
  RemoveActionFromRoleDtoSchema,
} from "@/app/lib/dto/action/removeActionFromRoleDto";

export const loadPageData = async (role: string) => {
  const roleActions = await loadActionsByRole(decodeURIComponent(role));
  const allActions = await listActions();

  const isFormState = (object: object | FormState) => {
    return "errors" in object || "message" in object;
  };

  return {
    roleActions: isFormState(roleActions) ? [] : (roleActions as IAction[]),
    allActions: isFormState(allActions) ? [] : (allActions as IAction[]),
  };
};

export const loadActionsByRole = action(async (roleName: string) => {
  return await Container(async ({ actionService }) => {
    const actions = await actionService.getActionsByRole(roleName);
    return actions.map(actionToDto);
  });
});

export const addActionToRole = formAction(async (state, formData) => {
  return await Container(
    async ({ revalidate, formDataValidationService, actionService }) => {
      const value = formDataValidationService.validateForm<AddActionToRoleDto>(
        AddActionToRoleSchema,
        formData
      );
      const actualRole = decodeURIComponent(value.role);

      await actionService.addActionToRole(actualRole, value.action);

      revalidate.roleActions(actualRole);

      return {
        message: `Action ${value.action} was added to ${actualRole} successfully`,
      } as FormState;
    }
  );
});

export const removeActionFromRole = action(
  async (props: { action: string; role: string }) => {
    return await Container(
      async ({ revalidate, formDataValidationService, actionService }) => {
        const { action, role } =
          formDataValidationService.validate<RemoveActionFromRoleDto>(
            RemoveActionFromRoleDtoSchema,
            props
          );

        const actualRole = decodeURIComponent(role);
        await actionService.removeActionFromRole(actualRole, action);

        revalidate.roleActions(actualRole);

        return {
          message: `Action ${action} was removed from ${actualRole}`,
        } as FormState;
      }
    );
  }
);
