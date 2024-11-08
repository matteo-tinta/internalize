import { Page } from "../components/page"
import { loadAllRoles } from "./actions"
import { AddRoleForm } from "./components/add-role-form.component"
import { RoleTable } from "./components/role-table.component"
import { RoleDelete } from "./role-delete"

const RolePage = async () => {
  const roles = await loadAllRoles()

  return (
    <Page>
      <section>
        <h1>Roles</h1>
        <p>See and define here your roles</p>
        <p>Roles groups actions, and can be linked to single users</p>

        <section>
          <AddRoleForm />
        </section>

        <RoleTable roles={roles} />
      </section>
    </Page>
  )
}

export default RolePage