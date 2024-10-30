"use client"
import { Button } from "@/app/components/form/button"
import { Field } from "@/app/components/form/field"
import { InternalizeForm } from "@/app/components/form/form"
import { Input } from "@/app/components/form/input"
import { Label } from "@/app/components/form/label"
import { Page } from "@/app/components/page"
import { addUser } from "./actions"

const AddUserForm = () => {
  
  return (
    <InternalizeForm action={addUser}
      render={(state) => (
        <>
          <Field>
            <Input placeholder="User id or email" disabled={state.pending} name="userId" id="userId"/>
          </Field>
          <Button className="w-full" type="submit" disabled={state.pending}>
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