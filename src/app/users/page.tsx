import { Page } from "../components/page"
import { loadUsers } from "./actions"
import { AddUserForm } from "./add/page"
import { UserDelete } from "./user-delete"

const UserPage = async () => {
  const users = await loadUsers() 
  return (
    <Page>
      <section>
        <h1>Users</h1>
        <p>Users are listed below, if a user is not listed than default roles are applied</p>

        <section className="my-2">
          <h2>Internalize a new user</h2>
          <AddUserForm />
        </section>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                User Id
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((m, i) => (
                <tr key={m.userId}>
                  <td>{i + 1}</td>
                  <td>{m.userId}</td>
                  <td>
                    <UserDelete userId={m.userId} />
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

export default UserPage