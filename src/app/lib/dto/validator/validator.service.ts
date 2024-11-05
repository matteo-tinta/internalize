import { FormState } from "@/app/lib/dto/form/form.definitions";
import { ZodError, ZodTypeAny } from "zod";

export class FormDataValidationException extends Error {
  formState: FormState;
  
  constructor(errors: ZodError<unknown>) {
    super("A validation error occoured");

    this.formState = {
      errors: errors.flatten().fieldErrors
    } as FormState
  }  
}

export class ValidatorService {
  public validate<T>(schema: ZodTypeAny, data: FormData): T {
    const objectEntries = Object.fromEntries(data)
    const validatedObject = schema.safeParse(objectEntries)
    if(!validatedObject.success) {
      throw new FormDataValidationException(validatedObject.error)
    }

    return validatedObject.data
  }
}