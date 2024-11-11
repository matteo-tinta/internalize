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

const buildDecodeRequestAsync = async (options: {
  headers: () => Promise<ReadonlyHeaders>;
  request: NextRequest;
  crypto: ContainerExecuteDependencies["crypto"];
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
    crypto: ContainerExecuteDependencies["crypto"];
    validatorService: ContainerExecuteDependencies["formDataValidationService"];
  }
) => {
  const { crypto, validatorService } = deps;

  const response = await executor();

  if (response.status >= 400) {
    //TODO: throw invalid response
    throw {
      status: response.status,
      statusText: response.statusText,
    };
  }

  const responseText = await response.text();
  const result = crypto.decrypt<object>(responseText);

  return validatorService.validate<InternalizeDecodeResponse>(
    InternalizeDecodeResponseSchema,
    result
  );
};

const encryptReponseForClient = (
  opt : {
    clientPublicKey: string,
    response: InternalizeUserRoleResponse
  },
  deps: {
    crypto: ContainerExecuteDependencies["crypto"];
  }
) => {
  const { clientPublicKey, response } = opt;
  const { crypto } = deps;

  //building an encryption function
  const clientEncrypt = crypto.encryptFromPublicKey(clientPublicKey);

  const clientEncriptedBuffer = clientEncrypt(response);
  return clientEncriptedBuffer.toString("base64");
};

export {
  buildDecodeRequestAsync,
  parseDecodeResponseAsync,
  encryptReponseForClient,
};
