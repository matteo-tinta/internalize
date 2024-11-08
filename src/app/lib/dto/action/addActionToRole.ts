import { z } from "zod";

export const AddActionToRoleSchema = z.object({
  role: z.string().min(1),
  action: z.string().min(1)
})

export type AddActionToRoleDto = z.infer<typeof AddActionToRoleSchema>