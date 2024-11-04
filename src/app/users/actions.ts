"use server"

import { Container } from "../lib/app/services/container.service"

export const loadUsers = async () => {
  try {
    return await Container(
      async ({ userService }) => {
        return await userService.all()
      }
    )
  } catch {
    return []
  }
}

export const deleteUser = async (props: {userId: string}) => {
  const { userId } = props

  try {
    return await Container(
      async ({userService, revalidate}) => {
        await userService.deleteUserAsync(userId)

        revalidate.users()
      }
    )
  } catch {
    return []
  }
}

