import React from "react"
import Carousel, { Modal, ModalGateway } from "react-images"

const Lightbox = ({ isModalOpen, onClose, views, currentIndex }) => {
  return (
    <ModalGateway>
      {isModalOpen ? (
        <Modal onClose={onClose} styles={{
            blanket: base => ({
                ...base,
                backgroundColor: 'black',
            })
        }}>
          <Carousel
            views={views}
            currentIndex={currentIndex}
            components={{ Footer: () => null }}
            styles={{
              view: (base) => ({
                ...base,
                "& > img": {
                  "max-height": "90vh",
                },
              }),
            }}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  )
}

export default Lightbox