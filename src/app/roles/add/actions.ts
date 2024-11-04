"use server"

import { handleError } from "@/app/actions";
import { CreateRoleDto, CreateRoleSchema } from "@/app/lib/app/dto/role/createRoleDto.model";
import { Container } from "@/app/lib/app/services/container.service";
import { ActionType, FormState } from "@/app/lib/form.definitions"

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