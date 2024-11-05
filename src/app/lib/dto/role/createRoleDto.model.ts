import { z } from "zod";

export const CreateRoleSchema = z.object({
  name: z.string().min(1)
})

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>