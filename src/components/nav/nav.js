import classNames from "classnames/bind"
import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Container from "../container/container"
import NavigationDots from "../dots/dots"
import { Instagram } from "../social/social"
import Cross from "../../../content/assets/cross.svg"
import Hamburger from "../../../content/assets/hamburger.svg"
import Logo from "../../../content/assets/logo.svg"
import { HOME_PATH, COLLECTIONS_PATH, PHOTOGRAPHY_PATH } from "../../utils/defs"

import {
    active,
    icon,
    mobileDots,
    mobileMenu,
    mobileMenuButton,
    mobileNavBar,
    mobileNavigation,
    mobileSocial,
    mobileSubLink,
    navigation,
    navigationContainer,
    navigationLink,
    navigationSubNav,
    navigationSubContainer,
    navigationSubLink,
    navigationSubLinks,
    wrapper,
    wrapperMobile,
} from "./style.scss"

const cx = classNames.bind({
    active,
    navigationLink,
    mobileSubLink,
})

const NavLink = ({ children, isSubNav = false, ...props }) => {
    const navStyle = !isSubNav ? navigationLink : navigationSubLink
    return (
        <Link className={navStyle} activeClassName={active} {...props}>
            {children}
        </Link>
    )
}

const MainNav = () => (
    <div className={wrapper}>
        <Link to={HOME_PATH}>
            <Logo className={icon} alt="logo" />
        </Link>
        <nav className={navigation}>
            <NavLink to={HOME_PATH}>About</NavLink>
            <span className={navigationSubNav}>
                <NavLink partiallyActive={true} to={PHOTOGRAPHY_PATH}>
                    Photography
                </NavLink>
                <div className={navigationSubContainer}>
                    <div className={navigationSubLinks}>
                        <NavLink to={PHOTOGRAPHY_PATH} isSubNav={true}>
                            Gallery
                        </NavLink>
                        <NavLink
                            to={COLLECTIONS_PATH}
                            isSubNav={true}
                            partiallyActive={true}
                        >
                            Collections
                        </NavLink>
                    </div>
                </div>
            </span>
        </nav>
    </div>
)

/**
 * Returns the base or all styles, including active styles, based on an exact or partial match
 * of the path. Partial match only matches the path including trailing forward slash `/`.
 * Utilizes currying partials to store attributes for later use.
 * @param {string} baseStyles - base style classnames to apply if there is no match
 * @param {string} allStyles - base styles including active style classname
 * @param {string} path - the path the link is navigating to
 * @returns object containing the className to apply to the link component
 */
const isActive = (baseStyles, allStyles, path) => ({ isCurrent, location }) => {
    const isPartiallyActive = location.pathname === `${path}/`
    const appliedStyles =
        isCurrent || isPartiallyActive ? allStyles : baseStyles
    return { className: appliedStyles }
}

const MobileNavLink = ({
    children,
    checkIsActive = false,
    isSubLink = false,
    to,
    ...props
}) => {
    const mobileLinkStyles = [navigationLink, { mobileSubLink: isSubLink }]
    const baseStyles = cx(mobileLinkStyles)
    const combinedStyles = cx(mobileLinkStyles, active)

    /* 
    getProps will overwrite what's passed into className so the callback must add the base styles
    required for the link. The purpose of this is set the active style by doing partial matches of 
    /photography and /photography/ but not /photography/collections, since page refreshses add a 
    trailing slash (/). `partiallyActive` prop does not work because it would match 
    /photography/collections
   */
    const linkGetProps = checkIsActive
        ? isActive(baseStyles, combinedStyles, to)
        : undefined
    return (
        <Link
            getProps={linkGetProps}
            className={baseStyles}
            activeClassName={active}
            to={to}
            {...props}
        >
            {children}
        </Link>
    )
}

const MobileNav = ({ location }) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // prevent scrolling when mobile nav is open
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <div className={wrapperMobile}>
            <div className={mobileNavBar}>
                <Link to={HOME_PATH} onClick={() => setIsOpen(false)}>
                    <Logo className={icon} alt="logo" />
                </Link>
                <button
                    className={mobileMenuButton}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {!isOpen ? (
                        <Hamburger className={icon} alt="menu" />
                    ) : (
                        <Cross className={icon} alt="close menu" />
                    )}
                </button>
            </div>
            {isOpen && (
                <div className={mobileMenu}>
                    <nav className={mobileNavigation}>
                        <MobileNavLink
                            onClick={() => setIsOpen(false)}
                            to={HOME_PATH}
                        >
                            About
                        </MobileNavLink>
                        <div>Photography</div>
                        <MobileNavLink
                            checkIsActive={true}
                            isSubLink={true}
                            onClick={() => setIsOpen(false)}
                            to={PHOTOGRAPHY_PATH}
                        >
                            Gallery
                        </MobileNavLink>
                        <MobileNavLink
                            isSubLink={true}
                            onClick={() => setIsOpen(false)}
                            partiallyActive={true}
                            to={COLLECTIONS_PATH}
                        >
                            Collections
                        </MobileNavLink>
                    </nav>
                    <div className={mobileSocial}>
                        <Instagram />
                    </div>
                    <div className={mobileDots}>
                        <NavigationDots location={location} />
                    </div>
                </div>
            )}
        </div>
    )
}

// wrapper & wrapperMobile css media queries determines which nav to display
const Nav = ({ location }) => (
    <Container className={navigationContainer}>
        <MainNav />
        <MobileNav location={location} />
    </Container>
)

export default Nav
