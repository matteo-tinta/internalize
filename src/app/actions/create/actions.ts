"use server"

import { handleError } from "@/app/actions";
import { CreateActionDto, CreateActionSchema } from "@/app/lib/app/dto/action/createActionDto.model";
import { Container } from "@/app/lib/app/services/container.service"
import { ActionType } from "@/app/lib/form.definitions"

const createAction: ActionType = async (state, formData) => {
  try {
    await Container(async ({ actionService, formDataValidationService, revalidate }) => {
      const data = formDataValidationService.validate<CreateActionDto>(CreateActionSchema, formData)
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

export {
  createAction
}