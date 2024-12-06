import { RoleType } from "@app/lib/domain/role/role.domain";
import { UserType } from "@app/lib/domain/user/user.domain";

type Optional<T> = {
  [K in keyof T]?: T extends (infer U)[] ? Optional<U> : Optional<T[K]>
}

type Constructor<T> = new (...args: any[]) => T;

const buildService = <T extends Constructor<any>>(
  ctor: T,
  ...args: Optional<ConstructorParameters<T>>): InstanceType<T> => {
  return new ctor(...args);
}

const build = <T extends object>(partial: Optional<T>): T => {
  if (Array.isArray(partial)) {
    return partial as T
  }

  return ({
    ...partial
  } as T)
}

const mock = <T extends object>(factory: Parameters<typeof build<T>>[0]) => {
  const service = build(factory)
  return vi.mocked(service)
}

const asArray = <T>(partial: Optional<T[]>) => build<T[]>(partial)

/** creates objects from optional (recursive) part */
export const factory = {
  build: build,
  emptyArray: (length: number) => Array(length).fill({}),
  array: <T, R = T>(length: number, map: (item: T, index: number) => R) => Array(length).fill({}).map<R>(map),
  asArray: asArray,
  service: buildService,
  mock,

  //types
  dbUser: build<UserType>,
  dbUserAsArray: asArray<UserType>,
  dbRole: build<RoleType>,
  dbRoleAsArray: asArray<RoleType>,
}

// let roleRepo: MockedObject<IRoleRepository>

//   beforeEach(() => {
//     roleRepo = vi.mocked(factory.build<IRoleRepository>({
//       all: vi.fn(async () => repoReturns)
//     }))
//   })
