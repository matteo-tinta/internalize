export const dynamic = "force-dynamic"

import { loadUsers } from "./actions";
import { AddUserForm } from "./add/page";
import { UserTable } from "./_components/user-table";

const UserPage = async () => {
  const users = await loadUsers();

  return (
    <section>
      <h1>Users</h1>
      <p>
        Users are listed below, if a user is not listed than default roles are
        applied
      </p>

      <section className="my-2">
        <AddUserForm />
      </section>

      <UserTable users={users!} />
    </section>
  );
};

export default UserPage;
