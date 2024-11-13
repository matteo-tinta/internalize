import { GetServerSideProps } from "next";
import { loadAllRoles } from "../roles/actions";

type RoleServerSideProps = {
  roles: Awaited<ReturnType<typeof loadAllRoles>>
}

const getRolesServerSideProps = (async () => {
  const action = await loadAllRoles();
  return {
    props: {
      roles: action
    },
  }
}) satisfies GetServerSideProps<RoleServerSideProps>

export {
  getRolesServerSideProps
}