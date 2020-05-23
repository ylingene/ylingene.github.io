import Image from "gatsby-image"
import getJustifiedLayout from "justified-layout"
import React, { useState, useMemo } from "react"
import PropTypes from "prop-types"
import useResizeObserver from "use-resize-observer"

import Lightbox from "../lightbox/lightbox"

import style from "./style.scss"

const GALLERY_CONFIG = {
      boxSpacing: 5,
      containerPadding: 0,
      targetRowHeight: 400,
      targetRowHeightTolerance: .25,
    }

const Widow = ({ containerWidth, widowBoxes, boxSpacing }) => {
    const height = widowBoxes[0].height
    const width =
      containerWidth -
      widowBoxes.reduce((acc, cur) => acc + cur.width, 0) -
      widowBoxes.length * boxSpacing
  return <div style={{height, width}} />
}

Widow.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  widowBoxes: PropTypes.arrayOf(PropTypes.shape({
    aspectRatio: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
  })).isRequired,
  boxSpacing: PropTypes.number.isRequired,
}

const Gallery = ({ fluidImages }) => {
    const { ref: containerRef, width } = useResizeObserver()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalCurrentImage, setModalCurrentImage] = useState(0)

    const galleryLayout = useMemo(() => {
        const aspectRatios = fluidImages.map(({ image }) => image.childImageSharp.fluid.aspectRatio)
        const updatedConfig = {
          ...GALLERY_CONFIG,
          containerWidth: width,
        }
        return width ? getJustifiedLayout(aspectRatios, updatedConfig) : null
    }, [fluidImages, width])

    const modalImagesSrc = useMemo(
      () =>
        fluidImages.map(({ image }) => ({
          src: image.childImageSharp.fluid.src
        })),
      [fluidImages]
    )

    const openModal = (index) => {
        setIsModalOpen(true)
        setModalCurrentImage(index)
    }

    return (
      <div ref={containerRef} className={style.galleryContainer}>
        {galleryLayout &&
          fluidImages.map(({ alt, image }, i) => {
            return (
              <div
                key={image.id}
                style={{
                  cursor: "pointer",
                  height: galleryLayout.boxes[i].height,
                  width: galleryLayout.boxes[i].width,
                  marginBottom: GALLERY_CONFIG.boxSpacing,
                }}
              >
                <a
                  tabIndex="0"
                  href={image.childImageSharp.fluid.src}
                  onClick={(e) => {
                    e.preventDefault()
                    openModal(i)
                  }}
                  onKeyDown={(e) => {
                    e.preventDefault()
                    openModal(i)
                  }}
                >
                  <Image fluid={image.childImageSharp.fluid} alt={alt} />
                </a>
              </div>
            )
          })}
        {galleryLayout &&
          galleryLayout.widowCount > 0 &&
          galleryLayout.widowCount < fluidImages.length && (
            <Widow
              containerWidth={width}
              widowBoxes={galleryLayout.boxes.slice(
                galleryLayout.boxes.length - galleryLayout.widowCount
              )}
              boxSpacing={GALLERY_CONFIG.boxSpacing}
            />
          )}
        <Lightbox
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          views={modalImagesSrc}
          currentIndex={modalCurrentImage}
        />
      </div>
    )
}

Gallery.propTypes = {
  fluidImages: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      type: PropTypes.string,
      image: PropTypes.shape({
        id: PropTypes.string,
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({
            aspectRatio: PropTypes.number,
            base64: PropTypes.string,
            sizes: PropTypes.string,
            src: PropTypes.string,
            srcSet: PropTypes.string,
          }),
        }),
      }),
    })
  ).isRequired,
}

export default Gallery
