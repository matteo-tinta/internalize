import { z } from "zod";

export const AddRoleToUserSchema = z.object({
  userId: z.string().min(1),
  role: z.string().min(1)
})

export type AddRoleToUserDto = z.infer<typeof AddRoleToUserSchema>