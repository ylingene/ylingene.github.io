import React from "react"
import Carousel, { Modal, ModalGateway } from "react-images"
import PropTypes from "prop-types"

import colors from "../../styles/_colors.scss"

const Lightbox = ({ isModalOpen, onClose, views, currentIndex }) => {
  return (
    <ModalGateway>
      {isModalOpen ? (
        <Modal
          onClose={onClose}
          styles={{
            blanket: (base) => ({
              ...base,
              backgroundColor: colors.black,
            }),
          }}
        >
          <Carousel
            views={views}
            currentIndex={currentIndex}
            components={{ Footer: null }}
            styles={{
              view: (base) => ({
                ...base,
                "& > img": {
                  maxHeight: "90vh",
                  maxWidth: "90vw",
                },
              }),
            }}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  )
}

Lightbox.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  views: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })),
  currentIndex: PropTypes.number.isRequired,
}

export default Lightbox