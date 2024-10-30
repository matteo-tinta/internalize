
export type FormState =
  | {
      errors?: Record<string, string[] | undefined> | undefined
      message?: string
    }
  | undefined

export type ActionType = (state: FormState, formData: FormData) => Promise<FormState>