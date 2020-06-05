import React from "react"
import PropTypes from "prop-types"

import Footer from "../footer/footer"
import Nav from "../nav/nav"

import style from "./style.scss"

const Layout = ({ location, children }) => {
  return (
    <div className={style.mainWrapper}>
      <Nav />
      <main className={style.mainContent}>{children}</main>
      <Footer location={location} />
    </div>
  )
}

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
