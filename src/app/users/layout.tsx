import { Page } from "../components/page";

const UserLayout = (props: Readonly<{
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

export default UserLayout