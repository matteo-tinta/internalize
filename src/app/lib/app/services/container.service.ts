import { buildMongoClient, InternalizeMongoClient, InternalizeMongoConnectionString} from "../../mongo/mongo-client"
import { RoleRepository } from "../dal/repositories/role/RoleRepository"
import { UnitOfWorkRepository } from "../dal/repositories/uof.repository"
import { UserRespository } from "../dal/repositories/user/user.repository"
import { ValidatorService } from "../dto/validator/validator.service"
import { revalidate } from "./cache.service"
import { RoleService } from "./roles/role.service"
import { UserService } from "./user/user.service"

type ContainerExecuteDependencies = {
  userService: UserService,
  roleService: RoleService,
  formDataValidationService: ValidatorService,
  revalidate: typeof revalidate
}

type ContainerExecuteFunction<T> = (deps: ContainerExecuteDependencies) => Promise<T | undefined>

const Container = async <T,>(
  execute: ContainerExecuteFunction<T>
) => {
  //Db connection
  const mongo: InternalizeMongoClient = await buildMongoClient(InternalizeMongoConnectionString!)

  //repositories
  const userRepository = new UserRespository(mongo)
  const roleRepository = new RoleRepository(mongo)
  const uof = new UnitOfWorkRepository(mongo)

  //services
  const userService = new UserService(userRepository, uof)
  const roleService = new RoleService(roleRepository, uof)
  const formDataValidationService = new ValidatorService()

  let result: T | undefined = undefined

  try {
    result = await execute({
      userService,
      roleService,
      formDataValidationService,
      revalidate
    })
  } finally {
    await mongo.client.close()
  }

  return result;
}

export {
  Container
}