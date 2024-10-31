"use server";

import { CreateUserDto, CreateUserSchema } from "@/app/lib/app/dto/user/createUserDto.model";
import { ActionType, FormState } from "@/app/lib/form.definitions";
import { Container } from "@/app/lib/app/services/container.service";
import { ServiceException } from "@/app/lib/app/services/exceptions/service.exception";
import { handleError } from "@/app/actions";

const addUser: ActionType = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    await Container(async ({ userService, formDataValidationService }) => {
      const data = formDataValidationService.validate<CreateUserDto>(CreateUserSchema, formData)
      await userService.addUserAsync(data.userId);
    });
  
    return {
      message: "ok"
    }

  } catch (error) {
    return handleError(error)
  }
};

export { addUser };
