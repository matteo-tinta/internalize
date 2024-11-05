import { Input as BaseInput, InputProps } from "@mui/base/Input";

const Input = (props: InputProps) => {
  return (
    <BaseInput
      slotProps={{
        input: {
          className:
            "",
        },
      }}
      {...props}
    />
  );
};

export { Input };
