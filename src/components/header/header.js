import classNames from "classnames/bind"
import React from "react"
import PropTypes from "prop-types"

import { ACCENT_BLUE, ACCENT_GREEN, ACCENT_RED } from "../../utils/defs"

import {
    borderBlue,
    borderGreen,
    borderRed,
    description as descriptionStyle,
    header as headerStyle,
    title as titleStyle,
} from "./style.scss"

const cx = classNames.bind({
    borderBlue,
    borderGreen,
    borderRed,
})

const getBorderClasses = (accentColor) =>
    cx({
        borderBlue: accentColor === ACCENT_BLUE,
        borderGreen: accentColor === ACCENT_GREEN,
        borderRed: accentColor === ACCENT_RED,
    })

const Header = ({ accentColor, title, sectionTitle, description }) => (
    <header className={headerStyle}>
        <div className={titleStyle}>
            <div className={getBorderClasses(accentColor)}></div>
            <div>
                <h3>{title}</h3>
                <h1>{sectionTitle}</h1>
            </div>
        </div>
        {!!description && <div className={descriptionStyle}>{description}</div>}
    </header>
)

Header.defaultProps = {
    description: ``,
}

Header.propTypes = {
    accentColor: PropTypes.oneOf([ACCENT_BLUE, ACCENT_GREEN, ACCENT_RED])
        .isRequired,
    title: PropTypes.string.isRequired,
    sectionTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
}

export default Header
