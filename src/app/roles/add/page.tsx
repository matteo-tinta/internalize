"use client"

import { Field } from "@/app/components/form/field"
import { InternalizeForm } from "@/app/components/form/form"
import { Input } from "@/app/components/form/input"
import { InputError } from "@/app/components/form/input-error"
import { Page } from "../../components/page"
import { addRole } from "./actions"
import { Button } from "@/app/components/form/button"

export const AddRoleForm = () => {
  

  return (
    <InternalizeForm action={addRole}
      render={(status, state) => (
        <>
          <Field>
            <Input 
              placeholder="Role Name" 
              disabled={status.pending} 
              name="name" 
              id="name"/>
            <InputError error={state?.errors?.name} />
            
          </Field>
          <Button className="w-full" type="submit" disabled={status.pending}>
            Create
          </Button>
        </>
      )}
    />
  )
}

const AddRolePage = () => {
  return (
    <Page>
      <section>
        <h1> Add Role </h1>
        <p> Add here a new role </p>
      </section>
    </Page>
  )
}

export default AddRolePage