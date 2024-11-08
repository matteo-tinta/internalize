import { z } from "zod";

export const RemoveActionFromRoleDtoSchema = z.object({
  role: z.string().min(1),
  action: z.string().min(1),
})

export type RemoveActionFromRoleDto = z.infer<typeof RemoveActionFromRoleDtoSchema>