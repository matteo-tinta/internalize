import { FormState } from "./lib/dto/form/form.definitions"
import { FormDataValidationException } from "./lib/dto/validator/validator.service"
import { ServiceException } from "./lib/services/exceptions/service.exception"

export const handleError = (error: unknown): FormState => {
  if(!error)
  {
    return {
      errors: {
        "root": "A generic error occoured"
      },
      message: "A generic error occoured"
    }
  }


  if(error instanceof FormDataValidationException) {
    const { formState, message } = error
    return {
      errors: formState.errors,
      message: message
    }  
  }

  if(error instanceof ServiceException) {
    return {
      errors: {
        "root": error.message
      },
      message: error.message
    }    
  }

  if(typeof error == "object" && "message" in error && typeof error?.message == "string" && error.message){
    return {
      errors: {
        "root": error.message
      },
      message: error.message
    }
  }

  if(typeof error == "string") {
    return {
      errors: {
        "root": error
      },
      message: error
    }
  }

  return {
    errors: {
      "root": "A generic error occoured"
    },
    message: "A generic error occoured"
  }
}

