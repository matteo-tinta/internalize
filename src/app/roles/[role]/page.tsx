"use server"

import { loadPageData } from "./actions"
import { RolePage } from "./components/role-page.component"

export default async function Page() {
  return (
    <RolePage loadPageData={loadPageData} />
  )
}

