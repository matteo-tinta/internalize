"use server"

import { handleError } from "../actions"
import { Container } from "../lib/app/services/container.service"

export const loadUsers = async () => {
  try {
    return await Container(
      async ({ userService }) => {
        return await userService.all()
      }
    )
  } catch (error) {
    return []
  }
}
