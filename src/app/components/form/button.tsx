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
  'btn',
  {
    variants: {
      variant: {
        simple: "btn-simple",
        primary: "btn-primary",
        secondary: "btn-secondary"
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