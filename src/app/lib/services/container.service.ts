import { LazyContainer } from '@/app/lib/services/lazy-container.service'
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
  userService: Promise<UserService>,
  roleService: Promise<RoleService>,
  actionService: Promise<ActionsService>,
  formDataValidationService: ValidatorService,
  revalidate: typeof revalidate,
  crypto: {
    local: ICryptoService,
    getRemotePublicKeyEncryptor: (key: string | null | undefined) => ICryptoPublicKeyEncrypter
  }
}

type ContainerExecuteFunction<T> = (container: LazyContainer) => Promise<T>

const Container = async <T,>(
  execute: ContainerExecuteFunction<T>,
  onError?: (error: unknown) => T
) => {
  let result: T;
  const container = new LazyContainer()
  try {
    result = await execute(container)
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

  container.dispose()
  return result;
}

export {
  Container
}