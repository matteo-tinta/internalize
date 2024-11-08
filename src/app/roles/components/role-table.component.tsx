"use client";

import { usePathname, useRouter } from "next/navigation";
import { RoleType } from "@/app/lib/domain/role/role.domain";
import { RoleDelete } from "../role-delete";

type RoleTableProps = {
  roles: RoleType[];
};

const RoleTable = (props: RoleTableProps) => {
  const { roles = [] } = props;

  const pathname = usePathname();
  const router = useRouter();

  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles?.map((role, i) => (
          <tr
            key={role.name}
            className="cursor-pointer"
            onClick={() => router.push(`${pathname}/${role.name}`)}
          >
            <td>{i + 1}</td>
            <td>{role.name}</td>
            <td>
              <RoleDelete name={role.name} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { RoleTable };
