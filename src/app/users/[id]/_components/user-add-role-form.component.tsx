import { Field } from "@/app/_components/form/field";
import { addRoleToUser } from "../actions";
import { IRole } from "@/app/lib/domain/role/role.domain";
import { Autocomplete } from "@/app/_components/form/autocomplete";
import { InternalizeForm } from "@/app/_components/form/internalize-form/internalize.form";
import { useDate } from "@/app/hooks/useDate.hook";

type UserAddRoleFormProps = {
  userId: string;
  allRoles: IRole[];
  userRoles: IRole[];
};

const UserAddRoleForm = (props: UserAddRoleFormProps) => {
  const {
    userId,
    allRoles,
    userRoles
  } = props
  const {iso} = useDate()
  const availableRoles = allRoles
    .filter(role => !userRoles.some(userRole => userRole.name == role.name))

  return (
    <InternalizeForm
      className="w-full"
      action={addRoleToUser}
      render={({status, form}) => {

        const handleSubmit = () => {
          if (form.current) {
            const formData = new FormData(form.current!);
            if (formData.get("role")) {
              form.current?.requestSubmit();
            }
          }
        }

        return (
          <Field>
            <input
              type="hidden"
              name="userId"
              value={decodeURIComponent(userId)}
            />
            <Autocomplete<IRole[]>
              key={iso} 
              onBlur={handleSubmit}
              getOptionLabel={(o) => o.name}
              label={o => o.name}
              id="role"
              name="role"
              disabled={!availableRoles.length || status.pending}
              placeholder="add a new role"
              componentName="role"
              options={availableRoles}
              isOptionEqualToValue={(option, value) =>
                option.name == value.name
              }
            />
          </Field>
        );
      }}
    />
  );
};


export {
  UserAddRoleForm
}