import "./menu.component.css"
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

const MenuGroup = (props: PropsWithChildren<{title: ReactNode}>) => {
  const {
    title,
    children
  } = props

  return (
    <div className="mb-5">
      <div className="font-bold text-xl mb-1">{title}</div>
      <section className="ps-2 ms-1 border-l-2 border-l-violet-500">
        {children}
      </section>
      
    </div>
  )
}

const MenuItem = (props: PropsWithChildren) => {
  return <div className="mb-2 menu-item">{props.children}</div>;
};

const Menu = () => {
  const currentPathname = usePathname()

  const addActiveClassIfActive = (pathname: string) => {
    return currentPathname === pathname ? 'active' : ''
  }

  const checkIfActive = (pathName: string, className?: string) => {
    return classNames(
      addActiveClassIfActive(pathName),
      className ?? ""
    )
  }

  const checkIfChildrenActive = (pathName: string, className?: string) => {
    return classNames(
      currentPathname.includes(pathName) ? "active" : "",
      className ?? ""
    )
  }

  return (
    <>
      <MenuGroup title="Internalize">
        <MenuItem>
          <Link className={checkIfActive("/")} href="/">Homepage</Link>
        </MenuItem>
      </MenuGroup>
      <MenuGroup title={
        <Link className={checkIfChildrenActive("/actions")} href="/actions">Actions</Link>
      }>
        <MenuItem>
          <Link className={checkIfActive("/actions/create")} href="/actions/create">Create</Link>
        </MenuItem>
      </MenuGroup>
    <MenuGroup title={
      <Link className={checkIfChildrenActive("/users")} href="/users">Users</Link>
    }> 
      <MenuItem>
      <Link className={checkIfActive("/users/add")} href="/users/add">Add</Link>
      </MenuItem>
    </MenuGroup>
    </>
  );
};

export { Menu };
