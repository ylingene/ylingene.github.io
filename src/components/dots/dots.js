import classNames from "classnames/bind"
import React from "react"
import PropTypes from "prop-types"

import {
    COLLECTIONS,
    ILLUSTRATIONS,
    PHOTOGRAPHY,
} from "../../utils/defs"
import { getPage, isActiveLocation } from "../../utils/utils"

import {
  blueDot,
  redDot,
  greenDot,
  largeDot,
  dotWrapper,
  navigationDots,
} from "./style.scss"

const cx = classNames.bind({
  blueDot,
  redDot,
  greenDot,
  largeDot,
})

const Dot = ({ className, colorClassName, isLarge = false }) => (
  <div
    className={cx(className, colorClassName, {largeDot: isLarge})}
  ></div>
)

export const BlueDot = ({ className, isLarge = false }) => (
        <Dot className={className} colorClassName={blueDot} isLarge={isLarge} />
      )
export const GreenDot = ({ className, isLarge = false }) => (

        <Dot className={className} colorClassName={greenDot} isLarge={isLarge} />
      )
export const RedDot = ({ className, isLarge = false }) => (
        <Dot className={className} colorClassName={redDot} isLarge={isLarge} />
      )

const Dots = ({ location }) => {
  const currentPage = getPage(location)
  return (
    <div className={navigationDots}>
      <div className={dotWrapper}>
        <BlueDot isLarge={isActiveLocation(PHOTOGRAPHY, currentPage)} />
      </div>
      <div className={dotWrapper}>
        <RedDot isLarge={isActiveLocation(COLLECTIONS, currentPage)} />
      </div>
      <div className={dotWrapper}>
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
