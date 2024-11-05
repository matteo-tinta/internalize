"use server";

import { ActionType, FormState } from "@/app/lib/dto/form/form.definitions";
import { handleError } from "@/app/actions";
import { Container } from "@/app/lib/services/container.service";
import { CreateUserDto, CreateUserSchema } from "@/app/lib/dto/user/createUserDto.model";

const addUser: ActionType = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    await Container(async ({ userService, formDataValidationService, revalidate }) => {
      const data = formDataValidationService.validate<CreateUserDto>(CreateUserSchema, formData)
      await userService.addUserAsync(data.userId);
      
      revalidate.users()
    });
  
    return {
      message: "ok"
    }

  } catch (error) {
    return handleError(error)
  }
};

export { addUser };
