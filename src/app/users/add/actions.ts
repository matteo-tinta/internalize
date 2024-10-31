"use server";

import { CreateUserSchema } from "@/app/lib/dto/users/createUserDto.model";
import { ActionType, FormState } from "@/app/lib/form.definitions";
import { Container } from "@/app/lib/services/container.service";

const addUser: ActionType = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedCreatedUser = CreateUserSchema.safeParse(Object.fromEntries(formData));
  if (!validatedCreatedUser.success) {
    return {
      errors: validatedCreatedUser.error.flatten().fieldErrors,
    };
  }

  await Container(async ({ userService }) => {
    const { data } = validatedCreatedUser;
    await userService.addUserAsync(data.userId);
  });
};

export { addUser };
