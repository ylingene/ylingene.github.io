import Image from "gatsby-image"
import getJustifiedLayout from "justified-layout"
import React, { useMemo } from "react"
import PropTypes from "prop-types"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import useResizeObserver from "use-resize-observer"

import style from "./style.scss"
import colors from "../../styles/_colors.scss"

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
    lightboxTransitionSpeed: 0.1,
    overlayColor: colors.white_faded,
    slideTransitionSpeed: 0.1,
  },
  buttons: {
    backgroundColor: "rgba(0,0,0,0)",
    iconColor: colors.black,
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
        const aspectRatios = fluidImages.map(({ image }) => image.childImageSharp.fluid.aspectRatio)
        const updatedConfig = {
          ...GALLERY_CONFIG,
          containerWidth: width,
        }
        return width ? getJustifiedLayout(aspectRatios, updatedConfig) : null
    }, [fluidImages, width])

    return (
      <SimpleReactLightbox>
        <SRLWrapper options={LIGHTBOX_OPTIONS}>
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
                    <Image fluid={image.childImageSharp.fluid} alt={alt} />
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
