import React from "react"
// import { Link } from "gatsby"

import Footer from "../footer/footer"
import Nav from "../nav/nav"

import style from "./style.scss"

const Layout = ({ data, location, title, children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  return (
    <div className={style.mainWrapper}>
      <Nav />
      <main className={style.mainContent}>{children}</main>
      <Footer location={location} />
    </div>
  )
}

export default Layout
