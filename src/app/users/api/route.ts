import { Container } from "@/app/lib/services/container.service";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { buildDecodeRequestAsync, encryptReponseForClient, parseDecodeResponseAsync } from "./route.helpers";
import { handleProcessError } from "./route.codes";
import { NoCryptoService } from "@/app/lib/services/crypto/no-crypto.service";

export async function GET(request: NextRequest) {
  return await Container(async ({ roleService, crypto, formDataValidationService }) => {
    const decodeTokenRequest = await buildDecodeRequestAsync({
      headers: headers,
      request: request,
      validationService: formDataValidationService
    })
    
    const { userId } = await parseDecodeResponseAsync(decodeTokenRequest.execute, {
      crypto: !decodeTokenRequest.publicKey ? new NoCryptoService() : crypto.local,
      validatorService: formDataValidationService
    })

    //find roles linked to asked userId
    const roles = await roleService.getRolesByUserId(userId);
    
    const response = {
      userId: userId,
      roles: await Promise.all(
        //populate for each role it's actions
        roles.map((role) =>
          role.populate("actions").then((r) => ({
            name: r.name,
            actions: r.actions.map((action) => action.name),
          }))
        )
      ),
    };
    

    const encodedClientResponse = encryptReponseForClient({
      clientPublicKey: decodeTokenRequest.publicKey,
      response: response
    }, {
      crypto: crypto
    })

    return new Response(encodedClientResponse);

  }, handleProcessError);
}
