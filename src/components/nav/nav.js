import React from "react";
import { Link } from "gatsby"

import Container from "../container/container"
import Logo from "../../../content/assets/logo.svg"
import { 
  COLLECTIONS_PATH,
  // ILLUSTRATIONS_PATH,
  PHOTOGRAPHY_PATH,
} from "../../utils/defs"

import {
  active,
  logo,
  navigation,
  navigationLink,
  navigationLinkWrapper,
  navigationSubNav,
  navigationSubNavCard,
  navigationSubNavLink,
  navigationSubNavLinks,
  wrapper,
} from "./style.scss"

const NavLink = ({ children, partiallyActive = false, to }) => (
  <div className={navigationLinkWrapper}>
    <Link
      className={navigationLink}
      activeClassName={active}
      partiallyActive={partiallyActive}
      to={to}
    >
      {children}
    </Link>
  </div>
)

const SubNavLink = ({ children, to }) => (
  <Link
    className={navigationSubNavLink}
    activeClassName={active}
    to={to}
  >
    {children}
  </Link>
)

const Nav = () => {
    return (
      <Container className={wrapper}>
        <Link to="/">
          <Logo className={logo} alt="logo" />
        </Link>
        <nav className={navigation}>
          <NavLink to="/">About</NavLink>
          <span className={navigationSubNav}>
            <NavLink
              partiallyActive={true}
              to={PHOTOGRAPHY_PATH}
            >
              Photography
            </NavLink>
            <div className={navigationSubNavLinks}>
              <div className={navigationSubNavCard}>
                <SubNavLink to={PHOTOGRAPHY_PATH}>Gallery</SubNavLink>
                <SubNavLink to={COLLECTIONS_PATH}>Collections</SubNavLink>
              </div>
            </div>
          </span>
          {/*
          <Link
            className={navigationLink}
            activeClassName={active}
            to={ILLUSTRATIONS_PATH}
          >
            Illustrations
          </Link>
          */}
        </nav>
      </Container>
    )
}

export default Nav
