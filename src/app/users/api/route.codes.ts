import { FormDataValidationException } from "@/app/lib/dto/validator/validator.service"

export enum ProcessErrorCodes {
  //UNKNOWN ERROR
  "UNK-0000" = "A generic error occoured",

  //Interrogation Error
  "INT-0001" = "An error occoured interrogating the BE",

  //validation errors
  "VAL-DEC-0000" = "A validation error occoured processing decode request",
  "VAL-DEC-0001" = "A validation error occoured processing decode request response",

  //process error (ie: building the response)
  "PROC-0000" = "An error occoured during the processing of the request",
  
  //encrypting errors
  "ENC-0000" = "A generic error occoured encrypting your data",
  "ENC-0001" = "The public key requested is too small for the data to be encrypted"
}

export class ProcessErrorException extends Error {
  constructor(error: ProcessErrorCodes, public status: object) {
    const [code] = Object.entries(ProcessErrorCodes).find(([, value]) => value == error) || ["UNK-0000"]

    super(`${code}:${error.toString()}`)
  }
}

const buildError = (opt: {
  code: ProcessErrorCodes | string,
  message?: string,
  responseInit?: ResponseInit,
  state?: object
}) => {
  const {
    code,
    state = {},
    message = code.toString()
  } = opt

  return new Response(JSON.stringify({
    message: `${code}:${message}`,
    ...state
  }), {
    status: opt.responseInit?.status ?? 500,
    statusText: opt.responseInit?.statusText ?? "Internal Server Error",
    headers: {
      ...opt.responseInit?.headers,
      "Content-Type": "application/json"
    }
  })
}

const genericError = buildError({
  code: ProcessErrorCodes["UNK-0000"]
})

export const handleProcessError = (error: unknown) => {
  console.error({error})
  if(!error){
    return genericError
  }

  if(error instanceof ProcessErrorException) {
    return buildError({
      code: error.message,
      message: JSON.stringify(error.status)
    })
  }

  if(error instanceof FormDataValidationException) {
    return buildError({
      code: ProcessErrorCodes["VAL-DEC-0000"],
      responseInit: {
        status: 400,
        statusText: "Bad Request"
      },
      state: {
        ...error.formState
      }
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
