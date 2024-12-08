"use server"

import { action, formAction } from '@/app/lib/helpers/form.helpers';
import { actionToDto } from "../lib/dto/action/action.model";
import { CreateActionDto, CreateActionSchema } from "../lib/dto/action/createActionDto.model";
import { ActionType } from "../lib/dto/form/form.definitions";
import { Container } from "../lib/services/container.service"

export const createAction: ActionType = formAction(async (_state, formData) => {
  return await Container(async ({ actionsService, formDataValidationService, revalidate }) => {
    const actionServiceAwaited = await actionsService

    const data = formDataValidationService.validateForm<CreateActionDto>(CreateActionSchema, formData)
    await actionServiceAwaited.addActionAsync(data.name);
    
    revalidate.actions()

    return {
      message: "ok"
    }
  })
});

export const listActions = async () => await Container(
    async ( {actionsService} ) => {
      const actionsServiceAwaited = await actionsService

      const actions = await actionsServiceAwaited.all()
      return actions.map(actionToDto)
    }
  )

export const deleteAction = action(async (props: {name: string}) => {
  const { name: actionName } = props

  return await Container(
    async ({actionsService, revalidate}) => {
      const actionServiceAwaited = await actionsService
      await actionServiceAwaited.deleteActionAsync(actionName)
      revalidate.actions()
    }
  )
})