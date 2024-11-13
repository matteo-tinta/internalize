"use server";

import { FormState } from "@/app/lib/dto/form/form.definitions";
import { Container } from "@/app/lib/services/container.service";
import {
  CreateUserDto,
  CreateUserSchema,
} from "@/app/lib/dto/user/createUserDto.model";
import { formAction } from "@/app/lib/helpers/form.helpers";

const addUser = formAction(async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  return await Container(
    async ({ userService, formDataValidationService, revalidate }) => {
      const data = formDataValidationService.validateForm<CreateUserDto>(
        CreateUserSchema,
        formData
      );
      await userService.addUserAsync(data.userId);

      revalidate.users();

      return {
        message: `User ${data.userId} was internalized!`,
      };
    }
  );
})

export { addUser };
