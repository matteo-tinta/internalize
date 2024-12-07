"use client";

import { usePathname, useRouter } from "next/navigation";
import { IRole } from "@/app/lib/domain/role/role.domain";
import { RoleDelete } from "../role-delete";
import classNames from 'classnames';

type RoleTableProps = {
  roles: IRole[];
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
            className={classNames(
              "cursor-pointer",
              {
                "disabled": !!role.fixed
              }
            )}
            onClick={() => router.push(`${pathname}/${role.name}`)}
          >
            <td>{i + 1}</td>
            <td>
              {role.name}
              {
                !!role.fixed && (
                  <div>
                    <div className='text-sm bg-orange-300 text-white inline-block px-2 rounded-sm'>
                      System Role
                    </div>
                  </div>
                )
              }
            </td>
            <td>
              <RoleDelete 
                disabled={!!role.fixed} 
                name={role.name} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { RoleTable };
