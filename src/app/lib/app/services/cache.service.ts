import { revalidatePath } from "next/cache";

const revalidate = {
  users: () => revalidatePath("/users")
}

export {
  revalidate
}