import "./menu.component.css";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";
import Image from "next/image";

const MenuLogo = () => {
  return (
    <Image alt="logo" src="/logo-horizontal.png" width={200} height={30} />
  );
};

const MenuGroup = (props: PropsWithChildren<{ title: ReactNode }>) => {
  const { title, children } = props;

  return (
    <div className="menu-group mb-5">
      <div className="text-xl mb-1">{title}</div>
      <section className="ps-2 ms-1">
        {children}
      </section>
    </div>
  );
};

const MenuItem = (props: PropsWithChildren) => {
  return <div className="mb-2 menu-item">{props.children}</div>;
};

const Menu = () => {
  const currentPathname = usePathname();

  const addActiveClassIfActive = (pathname: string) => {
    return currentPathname === pathname ? "active" : "";
  };

  const checkIfActive = (pathName: string, className?: string) => {
    return classNames(addActiveClassIfActive(pathName), className ?? "");
  };

  const checkIfChildrenActive = (pathName: string, className?: string) => {
    return classNames(
      currentPathname.includes(pathName) ? "active" : "",
      className ?? ""
    );
  };

  return (
    <div>
      <div className="mb-5">
        <MenuLogo />
      </div>
      <div className="px-2 pt-2">
      <MenuGroup
        title={
          <Link className={checkIfChildrenActive("/actions")} href="/actions">
            Actions
          </Link>
        }
      >
        <MenuItem>
          <Link
            className={checkIfActive("/actions/create")}
            href="/actions/create"
          >
            Create
          </Link>
        </MenuItem>
      </MenuGroup>
      <MenuGroup
        title={
          <Link className={checkIfChildrenActive("/users")} href="/users">
            Users
          </Link>
        }
      >
        <MenuItem>
          <Link className={checkIfActive("/users/add")} href="/users/add">
            Add
          </Link>
        </MenuItem>
      </MenuGroup>
      <MenuGroup
        title={
          <Link className={checkIfChildrenActive("/roles")} href="/roles">
            Roles
          </Link>
        }
      ></MenuGroup>
      </div>
      
    </div>
  );
};

export { Menu };
