import React from "react"
import PropTypes from "prop-types"

import { combineClassNames } from "../../utils/utils"

import style from "./style.scss"

const Container = ({ children, className }) => (
    <div className={combineClassNames([style.container, className])}>{children}</div>
)

Container.defaultProps = {
    className: ``,
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default Container
