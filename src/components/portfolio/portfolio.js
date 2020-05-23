import classNames from "classnames/bind"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Container from "../container/container"
import Gallery from "../gallery/gallery"
import Header from "../header/header"
import SEO from "../seo"

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

Filters.propTypes = {
  filterValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterUpdate: PropTypes.func.isRequired,
}

const Portfolio = ({ description, headerData, filters = [], fluidImages}) => {
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
      <SEO
        title={headerData.sectionTitle}
        description={headerData.description || description}
      />
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

Portfolio.propTypes = {
  description: PropTypes.string,
  headerData: PropTypes.shape({
    sectionTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string),
  fluidImages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ).isRequired,
}

export default Portfolio
