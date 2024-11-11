import { z } from "zod"

//Internalize Request
export const InternalizeRequestSchema = z.object({
  publicKey: z.string().min(1, "public key is mandatory"),
  interrogate: z.string().url("interrogate url is invalid")
})

export type InternalizeRequestDto = z.infer<typeof InternalizeRequestSchema>

//Token Decode process
export const InternalizeDecodeResponseSchema = z.object({
  userId: z.string().min(1).refine(decodeURIComponent),
  roles: z.array(z.string().min(1).refine(decodeURIComponent)).optional()
})

export type InternalizeDecodeResponse = z.infer<typeof InternalizeDecodeResponseSchema>

//Service Response
export const InternalizeUserRoleResponseSchema = z.object({
  userId: z.string().min(1).refine(decodeURIComponent),
  roles: z.array(
    z.object({
      name: z.string().min(1),
      actions: z.array(z.string().min(1))
    })
  ).optional()
})

export type InternalizeUserRoleResponse = z.infer<typeof InternalizeUserRoleResponseSchema>