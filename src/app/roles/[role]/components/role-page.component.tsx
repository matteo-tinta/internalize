"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { loadPageData } from "../actions";
import { RoleHeading } from "./role-title";
import { RoleAddActionForm } from "./role-add-action-form.component";
import { RoleActionDelete } from "./role-action-delete";

type RolePageProps = {
  loadPageData: typeof loadPageData;
};

const RolePage = (props: RolePageProps) => {
  const { role } = useParams<{ role: string }>();

  const [actions, setActions] = useState<
    Awaited<ReturnType<typeof props.loadPageData>>
  >({
    allActions: [],
    roleActions: [],
  });

  useEffect(() => {
    props.loadPageData(role).then(setActions);
  }, [props, role]);

  return (
    <>
      <RoleHeading />

      <section className="mt-5">
        <h2>Role Actions</h2>
        <p>This actions are linked to the current role</p>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Action name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actions.roleActions.map((action, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{action.name}</td>
                <td>
                <RoleActionDelete
                  action={action.name}
                  role={role}
                />
                </td>
              </tr>
            ))}

            <tr>
              <td>{actions.roleActions.length + 1}</td>
              <td className="flex items-center align-middle">
                <RoleAddActionForm
                  role={role}
                  {...actions}
                />
              </td>
              <td>
                <RoleActionDelete
                  role={role}
                  disabled={true}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export { RolePage };
