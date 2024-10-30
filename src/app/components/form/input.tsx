import { Input as BaseInput, InputProps } from "@mui/base/Input";

const Input = (props: InputProps) => {
  return (
    <BaseInput
      slotProps={{
        input: {
          className:
            "w-full font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 disabled:border-0",
        },
      }}
      {...props}
    />
  );
};

export { Input };
