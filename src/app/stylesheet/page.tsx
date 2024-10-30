import { Button } from "../components/form/button";
import { Field } from "../components/form/field";
import { Input } from "../components/form/input";
import { Label } from "../components/form/label";

const StylesheetPage = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </Field>
        <Field>
          <Label htmlFor="surname">Surname</Label>
          <Input id="surname" name="surname" />
        </Field>
      </div>
      
      <Button className="float-right" type="submit" variant="primary">
        Save
      </Button>
    </div>
  );
};

export default StylesheetPage;
