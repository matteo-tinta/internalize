import { ButtonProps, Button as BaseButton } from "@mui/base"
import { cva } from "class-variance-authority"
import classNames from "classnames"
import { forwardRef } from "react"

type FinalButtonProps = ButtonProps & {
  variant?: "primary" | "secondary" | "simple"
}

const Button = forwardRef<HTMLButtonElement, FinalButtonProps>((props, ref) => {
  
  const {
    className: inputClassName,
    ...otherProps
  } = props

  const className = classNames(
    buttonVariants({ variant: props.variant }),
    inputClassName
  )

  return (
    <BaseButton 
    ref={ref}
    className={className}
    {...otherProps}
    />
  )
})

Button.displayName = "Button"

const buttonVariants = cva(
  'cursor-pointer transition font-sans font-semibold leading-normal rounded-lg px-4 py-2 border border-solid  disabled:bg-slate-200 disabled:dark:bg-slate-700 disabled:cursor-default disabled:shadow-none disabled:dark:shadow-none disabled:hover:bg-slate-200 disabled:hover:dark:bg-slate-700 disabled:border-none',
  {
    variants: {
      variant: {
        simple: "border-0",
        primary: "bg-violet-500 text-white border-violet-500 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] hover:bg-violet-600 active:bg-violet-700 active:shadow-none active:scale-[0.99] focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none disabled:text-slate-700 disabled:dark:text-slate-200",
        secondary: "bg-gray-800 text-white border-gray-800 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#cacaca,_inset_0_-2px_1px_#000000] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#cacaca,_inset_0_-2px_1px_#000000] hover:bg-gray-900 active:bg-gray-700 active:shadow-none active:scale-[0.99] focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#cacaca] focus-visible:outline-none disabled:text-slate-700 disabled:dark:text-slate-200"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)

export {
  Button
}