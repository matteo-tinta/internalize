import { IRole } from "@/app/lib/domain/role/role.domain";
import { actionToDto } from "@/app/lib/dto/action/action.model";
import { roleToDto } from "@/app/lib/dto/role/role-dto.model";
import { Container } from "@/app/lib/services/container.service";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

type InterrogationResponse = {
  userId: string,
  roles: string[]
}

type InterrogationDtoResponse = {
  userId: string,
  roles: IRole[]
}

export async function GET(
  request: NextRequest
) {
  const headerList = await headers()

  //todo: add zod validation
  const interrogate = request.nextUrl.searchParams.get("interrogate")
  const authorizationHeader = headerList.get("authorization")

  const userInformations = await fetch(interrogate!, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${authorizationHeader}`!
    }
  })

  //todo: add zod validation
  //todo: add rsa encryption
  const result = await userInformations.json() as InterrogationResponse
  
  const userId = decodeURIComponent(result.userId)
  
  const response: InterrogationDtoResponse = await Container(
    async ( { roleService } ) => {
      const roles = await roleService.getRolesByUserId(userId)
      return {
        userId: userId,
        roles: await Promise.all(roles.map((role) => role.populate("actions").then((r) => ({
          name: r.name,
          actions: r.actions.map(action => action.name)
        }))))
      }
    }
  )
  
  console.log({ response })
  return Response.json(response)
}