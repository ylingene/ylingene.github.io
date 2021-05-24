import classNames from "classnames/bind"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Container from "../container/container"
import Gallery from "../gallery/gallery"
import Header from "../header/header"
import Seo from "../seo"

import { filter as filterStyle, filterActive, filters } from "./style.scss"

const cx = classNames.bind({
    filterStyle,
    filterActive,
    filters,
})

/**
 * Get's the first image's image data in the list of images that is a horizontal image.
 * This image will be used for the metadata image tags when sharing on social media,
 * which generally displays in a horizontal format.
 * 
 * @param {List[object]} images - list of objects that contain info about
 * each images' image src, height, and width. Used for metadata images
 * @returns object containing src, height, and width attributes
 */
const getMetaImage = (images) => {
    const firstHorizontalImage = images.find(({ image }) => {
        const { height, width } = image.childImageSharp.original
        return width > height
    })
    return firstHorizontalImage && firstHorizontalImage.image.childImageSharp.original
}

const Filters = ({ filterValues, activeFilter, onFilterUpdate }) => {
    return (
        <div className={filters}>
            {filterValues.map((filter) => (
                <button
                    key={filter}
                    className={cx({
                        filterStyle: true,
                        filterActive: filter === activeFilter,
                    })}
                    onClick={() => onFilterUpdate(filter)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {filter}
                </button>
            ))}
        </div>
    )
}

Filters.propTypes = {
    filterValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeFilter: PropTypes.string.isRequired,
    onFilterUpdate: PropTypes.func.isRequired,
}

const Portfolio = ({ description, headerData, filters = [], fluidImages }) => {
    const allFilters = ["all"].concat(filters)
    const [activeFilter, updateActiveFilter] = useState(allFilters[0])
    const [displayedImages, setDisplayedImages] = useState(fluidImages)

    /**
     * Based on the activeFilter, filter the images that are displayed
     * determined by the image's type attribute. Updates the displayedImages,
     * which is passed into the Gallery component
     */
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
            <Seo
                title={`${headerData.sectionTitle} ${headerData.title}`}
                description={headerData.description || description}
                keywords={[headerData.sectionTitle, headerData.title]}
                metaImage={getMetaImage(fluidImages)}
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
        description: PropTypes.string,
        sectionTitle: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    filters: PropTypes.arrayOf(PropTypes.string),
    fluidImages: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            image: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                    gatsbyImageData: PropTypes.object.isRequired,
                    original: PropTypes.shape({
                        src: PropTypes.string,
                        height: PropTypes.number,
                        width: PropTypes.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        })
    ).isRequired,
}

export default Portfolio
