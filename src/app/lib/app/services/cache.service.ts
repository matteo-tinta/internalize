import { revalidatePath } from "next/cache";

const revalidate = {
  users: () => revalidatePath("/users"),
  roles: () => revalidatePath("/roles")
}

export {
  revalidate
}