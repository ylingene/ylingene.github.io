import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import PropTypes from "prop-types"

import Container from "../container/container"
import { BlueDot, /*GreenDot,*/ RedDot } from "../dots/dots"
import SEO from "../seo"
import SocialLinks from "../social/social"
import { 
  COLLECTIONS_PATH,
  // ILLUSTRATIONS_PATH,
  PHOTOGRAPHY_PATH,
} from "../../utils/defs"

import style from "./style.scss"

const Picture = ({ author, image }) => (
  <div className={style.square}>
    <Image fixed={image} alt={author.name} className={style.profilePicture} />
  </div>
)

Picture.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  image: PropTypes.object.isRequired,
}

const AboutMe = () => (
  <div className={style.aboutMe}>
    <header className={style.header}>
      <h1>Lingene</h1>
      <div className={style.headerLine} />
    </header>
    <p>I'm an engineer and an artist.</p>
    <p>
      I graduated with a B.S.E. in Computer Science and Engineering from the
      University of Michigan in 2018, and I'm currently a senior software engineer
      at Affirm in San Francisco, CA.
    </p>
    <p>
      As an artist, I'm drawn to environments and nature. I capture them
      primarily through photographs, but I also enjoy exploring them through
      other art mediums.
    </p>
    <p>
      Connect with me at:{" "}
      <a href="mailto:ylingene@gmail.com">ylingene@gmail.com</a>
    </p>
    <SocialLinks />
  </div>
)

// (what about them: space, peaceful, story)

const Works = () => (
  <div>
    <header className={style.header}>
      <h2>Check out my work</h2>
    </header>
    <div className={style.links}>
      <Link className={style.link} to={PHOTOGRAPHY_PATH}>
        Photo Gallery
        <BlueDot className={style.dot} />
      </Link>
      <Link className={style.link} to={COLLECTIONS_PATH}>
        Photo Collections
        <RedDot className={style.dot} />
      </Link>
      {/*
      <Link className={style.link} to={ILLUSTRATIONS_PATH}>
        Illustrations
        <GreenDot className={style.dot} />
      </Link>
      */}
    </div>
  </div>
)

const About = () => {
    const data = useStaticQuery(graphql`
      query ProfileQuery {
        profilePicture: file(absolutePath: { regex: "/lingene.jpg/" }) {
          childImageSharp {
            fixed(width: 300) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        site {
          siteMetadata {
            author {
              name
            }
          }
        }
      }
    `)

    const image = data.profilePicture.childImageSharp.fixed
    const { author } = data.site.siteMetadata
    return (
      <Container className={style.wrapper}>
        <SEO />
        <div className={style.column}>
          <div className={style.pictureWrapper}>
            <Picture author={author} image={image} />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.aboutWrapper}>
            <AboutMe />
            <Works />
          </div>
        </div>
      </Container>
    )
}

export default About
