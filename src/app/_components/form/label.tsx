import classNames from "classnames";
import { DetailedHTMLProps, LabelHTMLAttributes, PropsWithChildren } from "react";

const Label = (props: PropsWithChildren<DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>>) => {
  const {
    children,
    className: inputClassNames,
    ...labelProps
  } = props

  const className = classNames(
    inputClassNames,
    "cursor-pointer inline-block w-full"
  )

  return (
    <label {...labelProps} 
      className={className}>
      {children}
    </label>
  )
}

export {
  Label
}