"use server";

import { Promise } from "mongoose";
import { action } from "../lib/helpers/form.helpers";
import { Container } from "../lib/services/container.service";

export const loadUsers = action(
  async () => Container(async ({ userService }) => {
    return await userService.all();
  })
)

export const deleteUser = action(async (props: { userId: string }) =>
  Container(async ({ userService, revalidate }) => {
    await userService.deleteUserAsync(props.userId);

    revalidate.users();
  })
);
