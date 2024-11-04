"use client"

import { InternalizeForm } from "@/app/components/form/form";
import { createAction } from "./actions";
import { Field } from "@/app/components/form/field";
import { Input } from "@/app/components/form/input";
import { Button } from "@/app/components/form/button";
import { Page } from "@/app/components/page";

const CreateActionForm = () => {
  return (
    <InternalizeForm
      action={createAction}
      render={(state) => (
        <>
          <Field>
            <Input placeholder="Action name" id="actionName" name="actionName" />
          </Field>

          <Button className="w-full float-right" type="submit" disabled={state.pending}>
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
