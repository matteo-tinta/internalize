import { revalidatePath } from "next/cache";

const revalidate = {
  users: () => revalidatePath("/users"),
  actions: () => revalidatePath("/actions"),
  roles: () => revalidatePath("/roles")
}

export {
  revalidate
}