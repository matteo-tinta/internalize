"use server"

import { loadAllRoles } from "@/app/roles/actions";
import { UserHeading } from "./user-title/user-title.component";

const Page = async () => {
  const roles = await loadAllRoles()

  return (
    <>
      <UserHeading />

      <section className="mt-5">
        <h2>User Roles</h2>
        <p>
          This roles are linked to the current user
        </p>
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
                    {/* <RoleDelete name={role.name} /> */}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
      
    </>

    
  )
}

export default Page