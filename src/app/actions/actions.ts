"use server"

import { handleError } from "../actions";
import { CreateActionDto, CreateActionSchema } from "../lib/dto/action/createActionDto.model";
import { ActionType } from "../lib/dto/form/form.definitions";
import { Container } from "../lib/services/container.service"

export const createAction: ActionType = async (state, formData) => {
  try {
    await Container(async ({ actionService, formDataValidationService, revalidate }) => {
      const data = formDataValidationService.validateForm<CreateActionDto>(CreateActionSchema, formData)
      await actionService.addActionAsync(data.name);
      
      revalidate.actions()
    });
  
    return {
      message: "ok"
    }

  } catch (error) {
    return handleError(error)
  }
}

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