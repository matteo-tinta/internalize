import { z } from "zod";

export const CreateUserSchema = z.object({
  userId: z.string().min(1)
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>