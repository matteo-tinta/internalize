"use client"

import { Field } from "@/app/components/form/field"
import { InputError } from "@/app/components/form/input-error"
import { InternalizeForm } from "@/app/components/form/internalize-form/internalize.form"
import { addRole } from "../actions"
import { Input } from "@/app/components/form/input"
import { Button } from "@/app/components/form/button"

const AddRoleForm = () => {
  return (
    <InternalizeForm action={addRole}
      render={({status, state}) => (
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

export {
  AddRoleForm
}