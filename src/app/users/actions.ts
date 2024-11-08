"use server";

import { action } from "../lib/helpers/form.helpers";
import { Container } from "../lib/services/container.service";
import { userToDto } from "../lib/dto/user/user-dto.model";

export const loadUsers = action(
  async () => Container(async ({ userService }) => {
    const users = await userService.all();
    return users.map(userToDto)
  })
)

export const deleteUser = action(async (props: { userId: string }) =>
  Container(async ({ userService, revalidate }) => {
    await userService.deleteUserAsync(props.userId);

    revalidate.users();
  })
);
