import React from "react"
import PropTypes from "prop-types"

import Container from "../container/container"
import NavigationDots from "../dots/dots"
import { Instagram } from "../social/social"

import style from "./style.scss"

const Footer = ({ location }) => (
    <footer>
        <Container className={style.wrapper}>
            <NavigationDots location={location} />
            <div className={style.footer}>
                <Instagram />
                <div className={style.copyright}>
                    © Lingene Yang {new Date().getFullYear()}
                </div>
            </div>
        </Container>
    </footer>
)

Footer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Footer
