import classNames from "classnames/bind"
import React from "react"
import PropTypes from "prop-types"

import { container } from "./style.scss"

const Container = ({ children, className }) => (
    <div className={classNames(container, className)}>{children}</div>
)

Container.defaultProps = {
    className: ``,
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default Container
