import { buildMongoClient, InternalizeMongoClient, InternalizeMongoConnectionString} from "../mongo/mongo-client"
import { UnitOfWorkRepository } from "../mongo/repositories/uof.repository"
import { UserRespository } from "../mongo/repositories/users/user.repository"
import { UserService } from "./users/user.service"

type ContainerExecuteDependencies = {
  userService: UserService
}

type ContainerExecuteFunction = (deps: ContainerExecuteDependencies) => Promise<void>

const Container = async (
  execute: ContainerExecuteFunction
) => {
  //Db connection
  const mongo: InternalizeMongoClient = await buildMongoClient(InternalizeMongoConnectionString!)

  //repositories
  const userRepository = new UserRespository(mongo)
  const uof = new UnitOfWorkRepository(mongo)

  //services
  const userService = new UserService(userRepository, uof)

  try {
    await execute({
      userService
    })

  } catch {
  } finally {
    await mongo.client.close()
  }
}

export {
  Container
}