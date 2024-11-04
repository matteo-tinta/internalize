"use client"

import { InternalizeForm } from "@/app/components/form/form";
import { createAction } from "./actions";
import { Field } from "@/app/components/form/field";
import { Input } from "@/app/components/form/input";
import { Button } from "@/app/components/form/button";
import { Page } from "@/app/components/page";
import { InputError } from "@/app/components/form/input-error";

export const CreateActionForm = () => {
  return (
    <InternalizeForm
      action={createAction}
      render={(status,state) => (
        <>
          <Field>
            <Input 
            placeholder="Action name" 
            id="name" 
            name="name" 
            disabled={status.pending}/>
            <InputError error={state?.errors?.name} />
          </Field>

          <Button className="w-full" type="submit" disabled={status.pending}>
            Create
          </Button>
        </>
      )}
    />
  );
}

const CreateActionPage = () => {
  return (
    <Page>
      <section>
        <h1>Create a new Action</h1>
        <p>Here you can create your actions</p>
        <p>
          Actions are the most closed scoped possible action of a user
        </p>
      </section>

      <CreateActionForm />
    </Page>
  )
};

export default CreateActionPage;
