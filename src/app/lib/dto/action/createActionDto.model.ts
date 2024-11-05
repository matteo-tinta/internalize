import { z } from "zod";

export const CreateActionSchema = z.object({
  name: z.string().min(1).refine(s => !s.includes(" "), "spaces are not allowed")
})

export type CreateActionDto = z.infer<typeof CreateActionSchema>