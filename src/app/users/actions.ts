"use server";

import { action } from "../lib/helpers/form.helpers";
import { Container } from "../lib/services/container.service";
import { userToDto } from "../lib/dto/user/user-dto.model";
import { FormState } from "../lib/dto/form/form.definitions";

export const loadUsers = action(
  async () => await Container(async ({ userService }) => {

    const users = await userService.all();
    return users.map(userToDto)
  })
)

export const deleteUser = action(async (props: { userId: string }) =>
  await Container(async ({ userService, revalidate }) => {
    await userService.deleteUserAsync(props.userId);
    revalidate.users();

    return {
      message: `User ${props.userId} was successfully deleted`
    } as FormState
  })
);
