"use client"

import { Field } from "@/app/components/form/field";
import { InputError } from "@/app/components/form/input-error";
import { InternalizeForm } from "@/app/components/form/internalize-form/internalize.form";
import { Button } from "@/app/components/form/button";
import { Input } from "@/app/components/form/input";
import { createAction } from "../actions";

export const CreateActionForm = () => {
  return (
    <InternalizeForm
      action={createAction}
      render={({status,state}) => (
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