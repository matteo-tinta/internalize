"use server"

import { handleError } from "@/app/actions";
import { ActionType, FormState } from "@/app/lib/dto/form/form.definitions"
import { CreateRoleDto, CreateRoleSchema } from "@/app/lib/dto/role/createRoleDto.model";
import { Container } from "@/app/lib/services/container.service";

const addRole: ActionType = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    await Container(async ({ roleService, formDataValidationService, revalidate }) => {
      const data = formDataValidationService.validate<CreateRoleDto>(CreateRoleSchema, formData)
      
      await roleService.addRoleAsync(data.name);
      
      revalidate.roles()
    });
  
    return {
      message: "ok"
    }

  } catch (error) {
    return handleError(error)
  }
}

export {
  addRole
}