
export type FormState = {
  message?: string | "ok";
  errors?: Record<string, string[] | string | undefined>
}

export type ActionType = (state: FormState, formData: FormData) => Promise<FormState>