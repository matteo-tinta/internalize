import { PropsWithChildren } from "react"

const Field = (props: PropsWithChildren) => {
  return (
    <section className="mb-3">
      {props.children}
    </section>
  )
}

export {
  Field
}