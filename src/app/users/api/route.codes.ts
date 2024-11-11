import { FormDataValidationException } from "@/app/lib/dto/validator/validator.service"

export enum ProcessErrorCodes {
  //UNKNOWN ERROR
  "UNK-0000" = "A generic error occoured",
  //validation errors
  "VAL-DEC-0000" = "A validation error occoured processing decode request",
  "VAL-DEC-0001" = "A validation error occoured processing decode request response",

  //process error (ie: building the response)
  "PROC-0000" = "An error occoured during the processing of the request",
  
  //encrypting errors
  "ENC-0000" = "A generic error occoured encrypting your data",
  "ENC-0001" = "The public key requested is too small for the data to be encrypted"
}

const buildError = (opt: {
  code: ProcessErrorCodes | string,
  message?: string,
  responseInit?: ResponseInit
}) => {
  const {
    code,
    message = code.toString()
  } = opt

  return new Response(`${code}:${message}`, {
    status: opt.responseInit?.status ?? 500,
    statusText: opt.responseInit?.statusText ?? `${code}:${message}`,
    headers: opt.responseInit?.headers ?? []
  })
}

const genericError = buildError({
  code: ProcessErrorCodes["UNK-0000"]
})

export const handleProcessError = (error: unknown) => {
  if(!error){
    return genericError
  }

  if(error instanceof FormDataValidationException) {
    return buildError({
      code: ProcessErrorCodes["VAL-DEC-0000"]
    })
  }

  if (
    typeof error == "object" &&
    "reason" in error &&
    typeof error.reason == "string" &&
    "code" in error &&
    typeof error.code == "string"
  ) {
    return buildError({
      code: error.code,
      message: error.reason
    })
  }

  return genericError
}
