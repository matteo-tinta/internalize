import { Page } from "../components/page"
import { loadAllRoles } from "./actions"

const RolePage = async () => {
  const roles = await loadAllRoles()

  return (
    <Page>
      <section>
        <h1>Roles</h1>
        <p>See and define here your roles</p>
        <p>Roles groups actions, and can be linked to single users</p>

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
              roles?.map((m, i) => (
                <tr key={m.name}>
                  <td>{i + 1}</td>
                  <td>{m.name}</td>
                  <td>
                    
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