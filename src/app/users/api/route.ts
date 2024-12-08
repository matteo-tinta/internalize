import { Container } from "@/app/lib/services/container.service";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import {
  buildDecodeRequestAsync,
  encryptReponseForClient,
  parseDecodeResponseAsync,
} from "./route.helpers";
import { handleProcessError } from "./route.codes";
import { NoCryptoService } from "@/app/lib/services/crypto/no-crypto.service";
import { isRoleServiceUserDoesNotExist } from "@/app/lib/services/exceptions/service.exception";
import { IRole, Role } from "@/app/lib/domain/role/role.domain";

export async function GET(request: NextRequest) {
  return await Container(
    async ({ roleService, crypto, formDataValidationService, userService }) => {
      const [
        roleServiceAwaited,
        userServiceAwaited,
      ] = await Promise.all([roleService, userService])

      const decodeTokenRequest = await buildDecodeRequestAsync({
        headers: headers,
        request: request,
        validationService: formDataValidationService,
      });

      const { userId, roles: userRoles } = await parseDecodeResponseAsync(
        decodeTokenRequest.execute,
        {
          crypto: !decodeTokenRequest.publicKey
            ? new NoCryptoService()
            : crypto.local,
          validatorService: formDataValidationService,
        }
      );

      //find roles linked to asked userId
      let roles
      try {
        roles = await roleServiceAwaited.getRolesByUserId(userId);
        
      } catch (error) {
        if(!isRoleServiceUserDoesNotExist(error)){
          throw error
        }
        
        //TODO: create user & roles
        const roles: IRole[] | undefined = userRoles?.map(role => ({
          name: role,
          actions: []
        }))

        await userServiceAwaited.addUserAsync(userId, roles)
      }
      finally {
        if(!roles)
        {
          roles = await roleServiceAwaited.getRolesByUserId(userId);
        }
      }

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

      const { contentType, value } = encryptReponseForClient(
        {
          clientPublicKey: decodeTokenRequest.publicKey,
          response: response,
        },
        {
          crypto: crypto,
        }
      );

      return new Response(value, {
        headers: {
          "Content-Type": contentType,
        },
      });
    },
    handleProcessError
  );
}
