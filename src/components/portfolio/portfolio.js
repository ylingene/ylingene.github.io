import classNames from "classnames/bind"
// import Image from "gatsby-image"
import React, { useState, useEffect } from "react"

import Container from "../container/container"
import Gallery from "../gallery/gallery"
import Header from "../header/header"

import style from "./style.scss"

const cx = classNames.bind(style)

const Filters = ({ filterValues, activeFilter, onFilterUpdate }) => {
  return (
    <div className={style.filters}>
      {filterValues.map((filter) => {
        return (
          <button
            key={filter}
            className={cx({
              filter: true,
              filterActive: filter === activeFilter,
            })}
            onClick={() => onFilterUpdate(filter)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}

/*
const FluidImage = ({ alt, image, orientation, thumbnailPosition }) => {
  let imageClasses
  let imageWrapperClasses
  if (orientation === "landscape") {
    imageClasses = cx({ landscape: true })
    imageWrapperClasses = cx({ landscapeWrapper: true })
  } else {
    imageClasses = cx({ portrait: true })
    imageWrapperClasses = cx({ portraitWrapper: true })
  }
  return (
    <div className={imageWrapperClasses} key={image.id}>
      <Image
        fluid={image.childImageSharp.fluid}
        alt={alt}
        className={imageClasses}
        imgStyle={
          {
            objectPosition: thumbnailPosition,
          }
        }
      />
    </div>
  )
}
*/

const Portfolio = ({ headerData, filters = [], fluidImages}) => {
  const allFilters = ["all"].concat(filters)
  const [activeFilter, updateActiveFilter] = useState(allFilters[0])
  const [displayedImages, setDisplayedImages] = useState(fluidImages)

  useEffect(() => {
    if (activeFilter === "all") {
      setDisplayedImages(fluidImages)
    } else {
      setDisplayedImages(
        fluidImages.filter((image) => image.type === activeFilter)
      )
    }
  }, [activeFilter, fluidImages])


  return (
    <Container>
      <Header {...headerData} />
      {filters.length > 0 && (
        <Filters
          filterValues={allFilters}
          activeFilter={activeFilter}
          onFilterUpdate={updateActiveFilter}
        />
      )}
      <Gallery fluidImages={displayedImages} />
    </Container>
  )
}

export default Portfolio
