import { PropsWithChildren } from "react";

const Page = (props: PropsWithChildren) => {
  return (
    <div className="mt-2">
      {props.children}
    </div>
  )
}

export {
  Page
}