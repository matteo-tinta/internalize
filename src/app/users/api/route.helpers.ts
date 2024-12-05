import { ValidatorService } from "@/app/lib/dto/validator/validator.service";
import {
  InternalizeDecodeResponse,
  InternalizeDecodeResponseSchema,
  InternalizeRequestDto,
  InternalizeRequestSchema,
  InternalizeUserRoleResponse,
} from "./route.dto";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { NextRequest } from "next/server";
import { ContainerExecuteDependencies } from "@/app/lib/services/container.service";
import { ProcessErrorCodes, ProcessErrorException } from "./route.codes";
import { NoCryptoPublicKeyEncrypter } from "@/app/lib/services/crypto/encryptors/no-crypto-public-key-encryptor";

const buildDecodeRequestAsync = async (options: {
  headers: () => Promise<ReadonlyHeaders>;
  request: NextRequest;
  validationService: ValidatorService;
}) => {
  const { request, headers, validationService } = options;

  const headerList = await headers();

  const interrogate = request.nextUrl.searchParams.get("interrogate");
  const publicKey = headerList.get("PUBLIC_KEY");

  const dto = {
    publicKey: publicKey,
    interrogate,
  };

  const validatedData = validationService.validate<InternalizeRequestDto>(
    InternalizeRequestSchema,
    dto
  );

  return {
    ...validatedData,
    execute: async () => {
      return await fetch(validatedData.interrogate, {
        method: "GET",
        headers: Object.fromEntries(headerList.entries()),
      });
    },
  };
};

const parseDecodeResponseAsync = async (
  executor: () => ReturnType<typeof fetch>,
  deps: {
    crypto: ContainerExecuteDependencies["crypto"]["local"];
    validatorService: ContainerExecuteDependencies["formDataValidationService"];
  }
) => {
  const { crypto, validatorService } = deps;

  try {
    const response = await executor()
  
    if (response.status >= 400) {
      throw new ProcessErrorException(ProcessErrorCodes["INT-0001"], {
        status: response.status,
        statusText: response.statusText,
      });
    }
  
    const responseText = await response.text();
    const result = crypto.decrypt<object>(responseText);
  
    return validatorService.validate<InternalizeDecodeResponse>(
      InternalizeDecodeResponseSchema,
      result
    );
  } catch (error) {
    throw new ProcessErrorException(ProcessErrorCodes["INT-0001"], {
      error: error
    });  
  }
};

const encryptReponseForClient = (
  opt : {
    clientPublicKey: string | null | undefined,
    response: InternalizeUserRoleResponse
  },
  deps: {
    crypto: ContainerExecuteDependencies["crypto"];
  }
) => {
  const { clientPublicKey, response } = opt;
  const { crypto } = deps;

  //building an encryption function
  const clientEncrypt = crypto.getRemotePublicKeyEncryptor(clientPublicKey);
  
  if(clientEncrypt instanceof NoCryptoPublicKeyEncrypter) {
    return {
      contentType: "application/json",
      value: JSON.stringify(response)
    };
  }

  return {
    contentType: "text/plain",
    value: clientEncrypt.encrypt(response)
  };
};

export {
  buildDecodeRequestAsync,
  parseDecodeResponseAsync,
  encryptReponseForClient,
};
