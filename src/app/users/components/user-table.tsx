"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserType } from "../../lib/domain/user/user.domain";
import { UserDelete } from "./user-delete";

type UserTableProps = {
  users: UserType[];
};

const UserTable = (props: UserTableProps) => {
  const { users = [] } = props;

  const pathname = usePathname();
  const router = useRouter();

  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>User Id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((m, i) => (
          <tr
            key={m.userId}
            className="cursor-pointer"
            onClick={() => router.push(`${pathname}/${m.userId}`)}
          >
            <td>{i + 1}</td>
            <td>{m.userId}</td>
            <td>
              <UserDelete userId={m.userId} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { UserTable };
