import classNames from "classnames/bind"
import React from "react"
import PropTypes from "prop-types"

import {
    COLLECTIONS,
    ILLUSTRATIONS,
    PHOTOGRAPHY,
} from "../../utils/defs"
import { combineClassNames, getPage } from "../../utils/utils"

import style from "./style.scss"

const cx = classNames.bind(style)

const DOT_COLORS = {
    blue: 1,
    red: 2,
    green: 3,
}

const dotStyle = (color, isLarge=false) => {
    return cx({
      blueDot: color === DOT_COLORS.blue,
      redDot: color === DOT_COLORS.red,
      greenDot: color === DOT_COLORS.green,
      largeDot: isLarge,
    })
}

const isActiveLocation = (page, currentPage) => page === currentPage

export const BlueDot = ({ className, isLarge = false }) => (
         <div
           className={combineClassNames([
             dotStyle(DOT_COLORS.blue, isLarge),
             className,
           ])}
         ></div>
       )
export const GreenDot = ({ className, isLarge = false }) => (
         <div
           className={combineClassNames([
             dotStyle(DOT_COLORS.green, isLarge),
             className,
           ])}
         ></div>
       )
export const RedDot = ({ className, isLarge = false }) => (
         <div
           className={combineClassNames([
             dotStyle(DOT_COLORS.red, isLarge),
             className,
           ])}
         ></div>
       )

const Dots = ({ location }) => {
  const currentPage = getPage(location)
  return (
    <div className={style.navigationDots}>
      <div className={style.dotWrapper}>
        <BlueDot isLarge={isActiveLocation(PHOTOGRAPHY, currentPage)} />
      </div>
      <div className={style.dotWrapper}>
        <RedDot isLarge={isActiveLocation(COLLECTIONS, currentPage)} />
      </div>
      <div className={style.dotWrapper}>
        <GreenDot isLarge={isActiveLocation(ILLUSTRATIONS, currentPage)} />
      </div>
    </div>
  )
}

Dots.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Dots
