import Image from "gatsby-image"
import getJustifiedLayout from "justified-layout"
import React, { useState } from "react"
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

const Gallery = ({ fluidImages }) => {
    const { ref: containerRef, width } = useResizeObserver()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalCurrentImage, setModalCurrentImage] = useState(0)

    let aspectRatios = [];
    let modalImagesSrc = [];
    fluidImages.forEach(({ image }) => {
        aspectRatios.push(image.childImageSharp.fluid.aspectRatio)
        modalImagesSrc.push({ src: image.childImageSharp.fluid.src })
    })

    const updatedConfig = {
      ...GALLERY_CONFIG,
      containerWidth: width,
    }
    const galleryLayout = width ? getJustifiedLayout(aspectRatios, updatedConfig) : null

    return (
      <div ref={containerRef} className={style.galleryContainer}>
        {galleryLayout &&
          fluidImages.map(({ image }, i) => {
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
                    setIsModalOpen(true)
                    setModalCurrentImage(i)
                  }}
                  onKeyDown={(e) => {
                    e.preventDefault()
                    setIsModalOpen(true)
                    setModalCurrentImage(i)
                  }}
                >
                  <Image fluid={image.childImageSharp.fluid} />
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

export default Gallery
