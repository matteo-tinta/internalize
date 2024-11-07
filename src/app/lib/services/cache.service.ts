import { revalidatePath } from "next/cache";
import { withLogger } from "../helpers/logging.helpers";

const cacheLogger = withLogger(
  (...args: unknown[]) => console.warn("[CACHE] revalidating cache", ...args)
)

const revalidateFnWithLogging = cacheLogger(revalidatePath)

const revalidate = {
  users: () => revalidateFnWithLogging("/users"),
  actions: () => revalidateFnWithLogging("/actions"),
  roles: () => revalidateFnWithLogging("/roles"),
  userRoles: (userId: string) => revalidateFnWithLogging(`/users/${userId}`, "page")
}

export {
  revalidate
}