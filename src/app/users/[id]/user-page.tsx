"use client"

import { useParams } from "next/navigation"
import { loadPageData } from "./actions"
import { UserAddRoleForm } from "./user-add-role-form/user-add-role-form.component"
import { UserHeading } from "./user-title/user-title.component"
import { useEffect, useState } from "react"
import { IRole } from "@/app/lib/domain/role/role.domain"

type UserPageProps = {
  loadPageData: typeof loadPageData
}

const UserPage = (props: UserPageProps) => {
  const { id: userIdEncoded } = useParams<{ id: string }>();
  const userId = decodeURIComponent(userIdEncoded ?? "");

  const [roles, setRoles] = useState<{
    userRoles: IRole[];
    allRoles: IRole[];
  }>({
    allRoles: [],
    userRoles: [],
  });

  useEffect(() => {
    props.loadPageData(userId).then(setRoles)
  }, [props, userId])

  return (
    <>
      <UserHeading />

      <section className="mt-5">
        <h2>User Roles</h2>
        <p>This roles are linked to the current user</p>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.userRoles.map((role, i) => (
              <tr key={role.name}>
                <td>{i + 1}</td>
                <td>{role.name}</td>
                <td>{/* <RoleDelete name={role.name} /> */}</td>
              </tr>
            ))}
            <tr>
              <td>{roles.userRoles.length + 1}</td>
              <td className="flex items-center align-middle">
                <UserAddRoleForm {...roles} userId={userId} />
              </td>
              <td> &nbsp; </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

export {
  UserPage
}