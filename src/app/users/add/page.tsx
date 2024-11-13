"use client"
import { Button } from "@/app/_components/form/button"
import { Field } from "@/app/_components/form/field"
import { Input } from "@/app/_components/form/input"
import { Page } from "@/app/_components/page"
import { addUser } from "./actions"
import { InputError } from "@/app/_components/form/input-error"
import { InternalizeForm } from "@/app/_components/form/internalize-form/internalize.form"

export const AddUserForm = () => {
  
  return (
    <InternalizeForm action={addUser}
      render={({status, state}) => (
        <>
          <Field>
            <Input 
              placeholder="User id or email" 
              disabled={status.pending} 
              name="userId" 
              id="userId"/>
            <InputError error={state?.errors?.userId} />
            
          </Field>
          <Button className="w-full" type="submit" disabled={status.pending}>
            Internalize!
          </Button>
        </>
      )}
    />
  )
}


const AddUserPage = () => {
  return (
    <Page>
      <section>
        <h1>Add User</h1>
        <p>Users that you adds here will be managed by Internalized</p>
      </section>

      <AddUserForm />
      
    </Page>
  )
}

export default AddUserPage