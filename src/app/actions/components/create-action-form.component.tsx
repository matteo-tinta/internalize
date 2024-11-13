"use client"

import { Field } from "@/app/_components/form/field";
import { InputError } from "@/app/_components/form/input-error";
import { InternalizeForm } from "@/app/_components/form/internalize-form/internalize.form";
import { Button } from "@/app/_components/form/button";
import { Input } from "@/app/_components/form/input";
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