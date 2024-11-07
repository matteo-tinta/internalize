import { Page } from "../components/page"
import { loadAllRoles } from "./actions"
import { AddRoleForm } from "./components/add-role-form.component"
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

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Role
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              roles?.map((role, i) => (
                <tr key={role.name}>
                  <td>{i + 1}</td>
                  <td>{role.name}</td>
                  <td>
                    <RoleDelete name={role.name} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </Page>
  )
}

export default RolePage