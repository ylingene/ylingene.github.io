import classNames from "classnames/bind"
import React from "react"

import { ACCENT_BLUE, ACCENT_GREEN, ACCENT_RED } from "../../utils/defs"

import style from "./style.scss"

const cx = classNames.bind(style)

const getBorderClasses = (accentColor) => (
    cx({
        borderBlue: accentColor === ACCENT_BLUE,
        borderGreen: accentColor === ACCENT_GREEN,
        borderRed: accentColor === ACCENT_RED,
    })
)

const Header = ({ accentColor, title, sectionTitle, description = "" }) => (
  <header className={style.header}>
    <div className={style.title}>
      <div className={getBorderClasses(accentColor)}></div>
      <div>
        <h3>{title}</h3>
        <h1>{sectionTitle}</h1>
      </div>
    </div>
    {!!description && <div className={style.description}>{description}</div>}
  </header>
)

export default Header
