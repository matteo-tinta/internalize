import { ValidatorService } from '@/app/lib/dto/validator/validator.service';
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from '@/app/lib/env';
import { buildMongoClient, InternalizeMongoConnectionString } from '@/app/lib/infrastructure/persistence/mongo-client';
import { ActionRepository } from '@/app/lib/infrastructure/persistence/repositories/action/action.repository';
import { RoleRepository } from '@/app/lib/infrastructure/persistence/repositories/role/RoleRepository';
import { UnitOfWorkRepository } from '@/app/lib/infrastructure/persistence/repositories/uof.repository';
import { UserRespository } from '@/app/lib/infrastructure/persistence/repositories/user/user.repository';
import { IActionRepository } from '@/app/lib/services/_interfaces/repositories/IActionRepository';
import { IRoleRepository } from '@/app/lib/services/_interfaces/repositories/IRoleRepository';
import { IUnitOfWorkRepository } from '@/app/lib/services/_interfaces/repositories/IUowRepository';
import { IUserRepository } from '@/app/lib/services/_interfaces/repositories/IUserRepository';
import { ActionsService } from '@/app/lib/services/actions/action.service';
import { revalidate } from '@/app/lib/services/cache.service';
import { CryptoServiceFactory } from '@/app/lib/services/crypto/crypto.factory';
import { CryptoPublicKeyEncryptorFactory } from '@/app/lib/services/crypto/encryptors/crypto-public-key-encryptor.factory';
import { RoleService } from '@/app/lib/services/roles/role.service';
import { UserService } from '@/app/lib/services/user/user.service';

export class LazyContainer {

  public dispose() {
    if(this._mongo){
      this._mongo.client.disconnect()
    }
  }

  //mongo db connection
  private _mongo: Awaited<ReturnType<typeof buildMongoClient>> | undefined
  get mongo() {
    return (async () => {
      if(!this._mongo){
        this._mongo = await buildMongoClient(InternalizeMongoConnectionString!)
      }

      return this._mongo
    })()
  }

  /** REPOSITORIES */
  private _userRepository: IUserRepository | undefined
  get userRepository() {
    return (async () => {
      if(!this._userRepository){
        this._userRepository = new UserRespository(await this.mongo)
      }

      return this._userRepository
    })()
  }

  private _roleRepository: IRoleRepository | undefined
  get roleRepository() {
    return (async () => {
      if(!this._roleRepository){
        this._roleRepository = new RoleRepository(await this.mongo)
      }

      return this._roleRepository
    })()
  }

  private _actionRepository: IActionRepository | undefined
  get actionRepository() {
    return (async () => {
      if(!this._actionRepository){
        this._actionRepository = new ActionRepository(await this.mongo)
      }

      return this._actionRepository
    })()
  }

  /** UOF */
  private _uof: IUnitOfWorkRepository | undefined
  get uof() {
    return (async () => {
      if(!this._uof){
        this._uof = new UnitOfWorkRepository(await this.mongo)
      }

      return this._uof
    })()
  }

  /** SERVICES */
  private _userService: UserService | undefined
  get userService() {
    return (async () => {
      if(!this._userService){
        this._userService = new UserService(
          await this.userRepository,
          await this.roleService,
          await this.uof
        )
      }

      return this._userService
    })()
  }

  private _roleService: RoleService | undefined
  get roleService() {
    return (async () => {
      if(!this._roleService){
        this._roleService = new RoleService(
          await this.roleRepository,
          await this.userRepository,
          await this.uof
        )
      }

      return this._roleService
    })()
  }

  private _actionService: ActionsService | undefined
  get actionsService() {
    return (async () => {
      if(!this._actionService){
        this._actionService = new ActionsService(
          await this.actionRepository,
          await this.roleRepository,
          await this.uof
        )
      }

      return this._actionService
    })()
  }

  private _formDataValidationService: ValidatorService | undefined
  get formDataValidationService() {
    if(!this._formDataValidationService){
      this._formDataValidationService = new ValidatorService()
    }

    return this._formDataValidationService
  }

  private _cryptoService: ReturnType<typeof CryptoServiceFactory.buildService> | undefined
  get cryptoService() {
    if(!this._cryptoService){
      this._cryptoService = CryptoServiceFactory.buildService({
        privateKey: RSA_PRIVATE_KEY,
        publicKey: RSA_PUBLIC_KEY
      })
    }

    return this._cryptoService
  }

  get revalidate() {
    return revalidate
  }

  get crypto() {
    return {
      local: this.cryptoService,
      getRemotePublicKeyEncryptor: 
        (key: Parameters<typeof CryptoPublicKeyEncryptorFactory.buildService>[0]) => 
          CryptoPublicKeyEncryptorFactory.buildService(key)
    }
  }
} 