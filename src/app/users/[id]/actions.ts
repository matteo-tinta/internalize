"use server"

import { handleError } from "@/app/actions"
import { ActionType, FormState } from "@/app/lib/dto/form/form.definitions"
import { AddRoleToUserDto, AddRoleToUserSchema } from "@/app/lib/dto/role/addRoleToUserDto"
import { roleToDto } from "@/app/lib/dto/role/role-dto.model"
import { Container } from "@/app/lib/services/container.service"
import { loadAllRoles } from "@/app/roles/actions"

const loadPageData = async (userId: string) => {
  return {
    userRoles: (await loadRolesByUserId(userId)) ?? [],
    allRoles: (await loadAllRoles()) ?? [],
  };
}

const loadRolesByUserId = async (userId: string) => {
  return await Container(
    async ( { roleService } ) => {
      const roles = await roleService.getRolesByUserId(userId)
      return roles.map(roleToDto)
    }
  )
}

const addRoleToUser: ActionType = async (state, formData) => {
  try {
    return await Container(
      async ({revalidate, formDataValidationService, roleService}) => {
        const value = formDataValidationService.validate<AddRoleToUserDto>(AddRoleToUserSchema, formData)
  
        await roleService.addRoleToUserAsync(value.userId, value.role)
  
        revalidate.userRoles(value.userId)
        
        return {
          message: `Role ${value.role} was correctly added to ${value.userId}`
        } as FormState
      }
    )
    
  } catch (error) {
    return handleError(error)    
  }
}

const removeRoleFromUser = async (props: {userId: string, role: string}) => {
  const {
    userId,
    role
  } = props

  try {
    return await Container(
      async ({roleService, revalidate}) => {
        await roleService.removeRoleFromUser(userId, role)

        revalidate.userRoles(userId)
      }
    )
  } catch {
    return []
  }
}

export {
  addRoleToUser,
  loadRolesByUserId,
  loadPageData,
  removeRoleFromUser
}