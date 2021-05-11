import { GatsbyImage, getImage } from "gatsby-plugin-image"
import getJustifiedLayout from "justified-layout"
import React, { useMemo } from "react"
import PropTypes from "prop-types"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import useResizeObserver from "use-resize-observer"

import { 
  black,
  galleryContainer,
  screen_mobile_small,
  white_faded,
} from "./style.scss"

const GALLERY_CONFIG = {
      boxSpacing: 5,
      containerPadding: 0,
      targetRowHeight: 400,
      targetRowHeightTolerance: .25,
    }

const LIGHTBOX_OPTIONS = {
  settings: {
    disablePanzoom: true,
    hideControlsAfter: 2000,
    lightboxTransitionSpeed: 0.2,
    overlayColor: white_faded,
    slideTransitionSpeed: 0.2,
    slideTransitionTimingFunction: "easeIn",
  },
  buttons: {
    backgroundColor: "rgba(0,0,0,0)",
    iconColor: black,
    showAutoplayButton: false,
    showDownloadButton: false,
    showFullscreenButton: false,
  },
  caption: {
    showCaption: false,
  },
  progressBar: {
    showProgressBar: false,
  },
  thumbnails: {
    showThumbnails: false,
  },
}

const getMobileImageSizes = (galleryWidth, imageDimensions) => (
  imageDimensions.map(({ height, width }) => {
    const aspectRatio = width / height
    return {
      height: galleryWidth / aspectRatio,
      width: galleryWidth,
    }
  })
)

const getImageLayout = (galleryWidth, images) => {
  const imageDimensions = images.map(({ image }) => {
    const img = getImage(image)
    return {
      height: img.height,
      width: img.width,
    }
  })

  // On small screens, display one image per row.
  // Justified layout doesn't produce the same result even with
  // fullWidthBreakoutRowCadence due to target height and tolerance.
  if (galleryWidth <= screen_mobile_small) {
    return {
      boxes: getMobileImageSizes(galleryWidth, imageDimensions),
      widowCount: 0,
    }
  }

  const justifiedLayoutConfig = {
    ...GALLERY_CONFIG,
    containerWidth: galleryWidth,
  }
  return getJustifiedLayout(imageDimensions, justifiedLayoutConfig)
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

    const galleryLayout = useMemo(() => {
        return width ? getImageLayout(width, fluidImages) : null
    }, [fluidImages, width])

    return (
      <SimpleReactLightbox>
        <SRLWrapper options={LIGHTBOX_OPTIONS}>
          <div ref={containerRef} className={galleryContainer}>
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
                    <GatsbyImage image={getImage(image)} alt={alt} />
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
          </div>
        </SRLWrapper>
      </SimpleReactLightbox>
    )
}

Gallery.propTypes = {
  fluidImages: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string.isRequired,
      type: PropTypes.string,
      image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        childImageSharp: PropTypes.shape({
          gatsbyImageData: PropTypes.shape({
            height: PropTypes.number,
            images: PropTypes.object,
            layout: PropTypes.string,
            width: PropTypes.string,
          }).isRequired,
        }).isRequired,
      }.isRequired),
    })
  ).isRequired,
}

export default Gallery
