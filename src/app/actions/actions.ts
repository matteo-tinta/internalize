"use server"

import { Container } from "../lib/services/container.service"

export const listActions = async () => {
  return await Container(
    async ( {actionService} ) => {
      return await actionService.all()
    }
  )
}

export const deleteAction = async (props: {name: string}) => {
  const { name: actionName } = props

  try {
    return await Container(
      async ({actionService, revalidate}) => {
        await actionService.deleteActionAsync(actionName)

        revalidate.actions()
      }
    )
  } catch {
    return []
  }
}