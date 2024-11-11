import { ValidatorService } from "../dto/validator/validator.service"
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from "../env"
import * as crypto from "../helpers/crypto.helpers"
import { InternalizeMongoClient, buildMongoClient, InternalizeMongoConnectionString } from "../infrastructure/persistence/mongo-client"
import { ActionRepository } from "../infrastructure/persistence/repositories/action/action.repository"
import { RoleRepository } from "../infrastructure/persistence/repositories/role/RoleRepository"
import { UnitOfWorkRepository } from "../infrastructure/persistence/repositories/uof.repository"
import { UserRespository } from "../infrastructure/persistence/repositories/user/user.repository"
import { ActionsService } from "./actions/action.service"
import { revalidate } from "./cache.service"
import { RoleService } from "./roles/role.service"
import { UserService } from "./user/user.service"

export type ContainerExecuteDependencies = {
  userService: UserService,
  roleService: RoleService,
  actionService: ActionsService,
  formDataValidationService: ValidatorService,
  revalidate: typeof revalidate,
  crypto: {
    encryptFromPublicKey: (key: string) => ReturnType<typeof crypto.encrypt>,
    encrypt: ReturnType<typeof crypto.encrypt>,
    decrypt: ReturnType<typeof crypto.decrypt>
  }
}

type ContainerExecuteFunction<T> = (deps: ContainerExecuteDependencies) => Promise<T>

const Container = async <T,>(
  execute: ContainerExecuteFunction<T>,
  onError?: (error: unknown) => void
) => {
  //Encryption RSA
  const encrypt = crypto.encrypt(crypto.fromString(RSA_PUBLIC_KEY!))

  const decrypt = crypto.decrypt(crypto.fromString(RSA_PRIVATE_KEY!))

  //Db connection
  const mongo: InternalizeMongoClient = await buildMongoClient(InternalizeMongoConnectionString!)

  //repositories
  const userRepository = new UserRespository(mongo)
  const roleRepository = new RoleRepository(mongo)
  const actionRepository = new ActionRepository(mongo)
  const uof = new UnitOfWorkRepository(mongo)

  //services
  const userService = new UserService(userRepository, uof)
  const roleService = new RoleService(roleRepository, userRepository, uof)
  const actionService = new ActionsService(actionRepository, roleRepository, uof)
  const formDataValidationService = new ValidatorService()

  let result: T;

  try {
    result = await execute({
      userService,
      roleService,
      actionService,
      formDataValidationService,
      revalidate,
      crypto: {
        encryptFromPublicKey: (key: string) => crypto.encrypt(crypto.fromString(key)),
        encrypt,
        decrypt
      }
    })
  } 
  catch (error) {
    if(onError){
      onError(error)
      return;
    }
    
    throw error;
  }
  finally {
    // await mongo.client.disconnect()
  }

  return result;
}

export {
  Container
}