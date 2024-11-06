"use server"

import { Container } from "@/app/lib/services/container.service"

const loadRolesByUserId = async (userId: string) => {
  return await Container(
    async ( { roleService } ) => {
      const roles = await roleService.getRolesByUserId(userId)
      return roles.map(r => r.toObject())
    }
  )
}

export {
  loadRolesByUserId
}