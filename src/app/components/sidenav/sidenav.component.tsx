"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { Button } from "../form/button"
import { useState } from "react"
import classNames from "classnames"
import { Menu } from "./menu.component"

const BarsIcon = () => <FontAwesomeIcon width="15" icon={faBars} />

const Sidenav = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true)

  const toggleSidenavOpen = () => {
    setIsSidenavOpen(prev => !prev)
  }

  return (
    <div className={
      classNames(
        "max-w-[230px] shadow shadow-violet-500 min-w-[65px] h-[100vh] relative p-2 bg-sidenav",
        {
          "!min-w-[230px]": isSidenavOpen
        }
      )
    }>
      <Button className="absolute bottom-2 right-2" onClick={toggleSidenavOpen}>
        <BarsIcon />
      </Button>

      <div className={
        classNames("w-[25vw] overflow-x-hidden transition-width",{
          "!w-0": !isSidenavOpen
        })
      }>
        <Menu />
      </div>
    </div>
  )
}

export {
  Sidenav
}