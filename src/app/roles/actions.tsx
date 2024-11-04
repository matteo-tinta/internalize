"use server"

import { Container } from "../lib/app/services/container.service"

const loadAllRoles = async () => {
  return await Container(
    async ( { roleService } ) => {
      return await roleService.all()
    }
  )
}

export {
  loadAllRoles
}