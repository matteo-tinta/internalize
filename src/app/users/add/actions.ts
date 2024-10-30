"use server"

import { CreateUserSchema } from "@/app/lib/dto/users/createUserDto.model"
import { ActionType, FormState } from "@/app/lib/form.definitions"
import { UserRespository } from "@/app/lib/mongo/users/user.repository"
import { ObjectId } from "mongodb"

const addUser: ActionType = async (state: FormState, formData: FormData): Promise<FormState> => {
  const validatedCreatedUser = CreateUserSchema.safeParse(Object.fromEntries(formData))
  if(!validatedCreatedUser.success) {
    return {
      errors: validatedCreatedUser.error.flatten().fieldErrors
    }
  }
  

  const userRepository = new UserRespository()
  userRepository.create({
    _id: new ObjectId(),
    userId: validatedCreatedUser.data.userId
  })

  const users = await userRepository.all()

  console.log({users, data: validatedCreatedUser.data})
}

export {
  addUser
}