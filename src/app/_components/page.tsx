import { PropsWithChildren } from "react";

const Page = (props: PropsWithChildren) => {
  return (
    <div className="mt-6 px-4">
      {props.children}
    </div>
  )
}

export {
  Page
}