import React from "react"

import { combineClassNames } from "../../utils/utils"

import style from "./style.scss"

const Container = ({ children, className }) => (
    <div className={combineClassNames([style.container, className])}>{children}</div>
)

export default Container
