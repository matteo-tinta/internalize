import { ValidatorService } from "../dto/validator/validator.service"
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from "../env"
import { InternalizeMongoClient, buildMongoClient, InternalizeMongoConnectionString } from "../infrastructure/persistence/mongo-client"
import { ActionRepository } from "../infrastructure/persistence/repositories/action/action.repository"
import { RoleRepository } from "../infrastructure/persistence/repositories/role/RoleRepository"
import { UnitOfWorkRepository } from "../infrastructure/persistence/repositories/uof.repository"
import { UserRespository } from "../infrastructure/persistence/repositories/user/user.repository"
import { ActionsService } from "./actions/action.service"
import { revalidate } from "./cache.service"
import { CryptoServiceFactory } from "./crypto/crypto.factory"
import { ICryptoService } from "./crypto/crypto.service"
import { CryptoPublicKeyEncryptorFactory } from "./crypto/encryptors/crypto-public-key-encryptor.factory"
import { ICryptoPublicKeyEncrypter } from "./crypto/encryptors/crypto-public-key-encryptor.service"
import { RoleService } from "./roles/role.service"
import { UserService } from "./user/user.service"

export type ContainerExecuteDependencies = {
  userService: UserService,
  roleService: RoleService,
  actionService: ActionsService,
  formDataValidationService: ValidatorService,
  revalidate: typeof revalidate,
  crypto: {
    local: ICryptoService,
    getRemotePublicKeyEncryptor: (key: string | null | undefined) => ICryptoPublicKeyEncrypter
  }
}

type ContainerExecuteFunction<T> = (deps: ContainerExecuteDependencies) => Promise<T>

const Container = async <T,>(
  execute: ContainerExecuteFunction<T>,
  onError?: (error: unknown) => T
) => {
  //Db connection
  const mongo: InternalizeMongoClient = await buildMongoClient(InternalizeMongoConnectionString!)

  //repositories
  const userRepository = new UserRespository(mongo)
  const roleRepository = new RoleRepository(mongo)
  const actionRepository = new ActionRepository(mongo)
  const uof = new UnitOfWorkRepository(mongo)

  //services
  const roleService = new RoleService(roleRepository, userRepository, uof)
  const userService = new UserService(userRepository, roleService, uof)
  const actionService = new ActionsService(actionRepository, roleRepository, uof)
  const formDataValidationService = new ValidatorService()

  const cryptoService = CryptoServiceFactory.buildService({
    privateKey: RSA_PRIVATE_KEY,
    publicKey: RSA_PUBLIC_KEY
  })

  let result: T;

  try {
    result = await execute({
      userService,
      roleService,
      actionService,
      formDataValidationService,
      revalidate,
      crypto: {
        local: cryptoService,
        getRemotePublicKeyEncryptor: (key) => CryptoPublicKeyEncryptorFactory.buildService(key)
      }
    })
  } 
  catch (error) {
    if(onError){
      return onError(error)
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