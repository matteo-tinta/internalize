import { Field } from "@/app/components/form/field";
import { Autocomplete } from "@/app/components/form/autocomplete";
import { InternalizeForm } from "@/app/components/form/internalize-form/internalize.form";
import { useDate } from "@/app/hooks/useDate.hook";
import { IAction } from "@/app/lib/domain/action/action";
import { addActionToRole } from "../actions";

type RoleAddActionFormProps = {
  role: string;
  allActions: IAction[];
  roleActions: IAction[];
};

const RoleAddActionForm = (props: RoleAddActionFormProps) => {
  const {
    allActions,
    roleActions,
    role,
  } = props

  const {iso} = useDate()
  const availableActions = allActions
    .filter(role => !roleActions.some(userRole => userRole.name == role.name))

  return (
    <InternalizeForm
      className="w-full"
      action={addActionToRole}
      render={({status, form}) => {

        const handleSubmit = () => {
          if (form.current) {
            const formData = new FormData(form.current!);
            if (formData.get("action")) {
              form.current?.requestSubmit();
            }
          }
        }

        return (
          <Field>
            <input
              type="hidden"
              name="role"
              value={decodeURIComponent(role)}
            />

            <Autocomplete<IAction[]>
              key={iso} 
              onBlur={handleSubmit}
              getOptionLabel={(o) => o.name}
              label={o => o.name}
              id="action"
              name="action"
              disabled={!availableActions.length || status.pending}
              placeholder="add a new action"
              componentName="action"
              options={availableActions}
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
  RoleAddActionForm
}