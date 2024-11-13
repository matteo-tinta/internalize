import { Page } from "../_components/page";

const RoleLayout = (props: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) => {

  const {
    children
  } = props

  return (
    <Page>
      {children}
    </Page>
  )
}

export default RoleLayout