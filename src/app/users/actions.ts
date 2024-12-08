"use server";

import { action } from "../lib/helpers/form.helpers";
import { Container } from "../lib/services/container.service";
import { userToDto } from "../lib/dto/user/user-dto.model";
import { FormState } from "../lib/dto/form/form.definitions";

export const loadUsers = async () => {
  return await Container(async ({ userService }) => {
    const userServiceAwaited = await userService
  
    const users = await userServiceAwaited.all();
    return users.map(userToDto)
  })
}

export const deleteUser = action(async (props: { userId: string }) =>
  await Container(async ({ userService, revalidate }) => {
    const userServiceAwaited = await userService

    await userServiceAwaited.deleteUserAsync(props.userId);
    
    revalidate.users();

    return {
      message: `User ${props.userId} was successfully deleted`
    } as FormState
  })
);
