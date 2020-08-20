import classNames from "classnames/bind"
import React from "react";
import { Link } from "gatsby"

import Container from "../container/container"
import Logo from "../../../content/assets/logo.svg"
import { 
  COLLECTIONS_PATH,
  // ILLUSTRATIONS_PATH,
  PHOTOGRAPHY_PATH,
} from "../../utils/defs"
import { isCollectionsPage, isPhotographyGalleryPage, isPhotographyPage } from "../../utils/utils"

import style from "./style.scss"

const cx = classNames.bind(style)

// used for highlighting a link if the current page is grouped with that link
// (e.g. gallery and collections are a part of Photography)
const highlightLink = (location, isPageFunc, extraClasses) => {
  const isPartiallyCurrent = isPageFunc(location)
  const classes = cx({
    active: true,
    ...extraClasses,
  })
  return isPartiallyCurrent
    ? {
        className: classes,
      }
    : null
}

const Nav = () => {
    return (
      <Container className={style.wrapper}>
        <Link to="/">
          <Logo className={style.logo} alt="logo" />
        </Link>
        <nav className={style.navigation}>
          <div className={style.navigationLinkWrapper}>
            <Link
              className={style.navigationLink}
              activeClassName={style.active}
              to="/"
            >
              About
            </Link>
          </div>
          <span className={style.navigationSubNav}>
            <div className={style.navigationLinkWrapper}>
              <Link
                className={style.navigationSubNavTitle}
                activeClassName={style.active}
                getProps={({ location }) =>
                  highlightLink(location, isPhotographyPage, {
                    navigationSubNavTitle: true,
                  })
                }
                to={PHOTOGRAPHY_PATH}
              >
                Photography
              </Link>
            </div>
            <div className={style.navigationSubNavLinks}>
              <div className={style.navigationSubNavCard}>
                <Link
                  className={style.navigationSubNavLink}
                  activeClassName={style.active}
                  getProps={({ location }) =>
                    highlightLink(location, isPhotographyGalleryPage, {
                      navigationSubNavLink: true,
                    })
                  }
                  to={PHOTOGRAPHY_PATH}
                >
                  Gallery
                </Link>
                <Link
                  className={style.navigationSubNavLink}
                  activeClassName={style.active}
                  getProps={({ location }) =>
                    highlightLink(location, isCollectionsPage, {
                      navigationSubNavLink: true,
                    })
                  }
                  to={COLLECTIONS_PATH}
                >
                  Collections
                </Link>
              </div>
            </div>
          </span>
          {/*
          <Link
            className={style.navigationLink}
            activeClassName={style.active}
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
