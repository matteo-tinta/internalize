import { z } from "zod";

export const RemoveRoleFromUserDtoSchema = z.object({
  userId: z.string().min(1),
  role: z.string().min(1)
})

export type RemoveRoleFromUserDto = z.infer<typeof RemoveRoleFromUserDtoSchema>