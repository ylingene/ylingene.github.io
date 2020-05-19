import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import Container from "../container/container"
import { BlueDot, GreenDot, RedDot } from "../dots/dots"
import SocialLinks from "../social/social"
import { 
  COLLECTIONS_PATH,
  ILLUSTRATIONS_PATH,
  PHOTOGRAPHY_PATH,
} from "../../utils/defs"

import style from "./style.scss"

const PictureBlock = ({ author, image }) => (
  <div className={style.square}>
    <Image fixed={image} alt={author.name} className={style.profilePicture} />
  </div>
)

const AboutMe = () => (
  <div className={style.aboutMe}>
    <header className={style.header}>
      <h1>Lingene</h1>
      <div className={style.headerLine} />
    </header>
    <p>
      I am currently a software engineer at Affirm and based in San Francisco. I
      graduated with a B.S.E. in Computer Science and Engineering (CSE) from the
      University of Michigan in 2018.
    </p>
    <p>
      I am passionate about art and design, and I am always taking inspiration
      from them and incorporating it into my work.
    </p>
    <p>
      I enjoy spending taking photos in both digital and film and exploring
      other art mediums.
    </p>
    <p>
      Feel free to contact and connect with me at: <br />
      <a href="mailto:ylingene@gmail.com">ylingene@gmail.com</a>
    </p>
    <SocialLinks />
  </div>
)

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
      <Link className={style.link} to={ILLUSTRATIONS_PATH}>
        Illustrations
        <GreenDot className={style.dot} />
      </Link>
    </div>
  </div>
)

const About = () => {
    const data = useStaticQuery(graphql`
      query ProfileQuery {
        profilePicture: file(absolutePath: { regex: "/lingene.jpg/" }) {
          childImageSharp {
            fixed(width: 300) {
              ...GatsbyImageSharpFixed
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
        <div className={style.column}>
          <div className={style.pictureWrapper}>
            <PictureBlock author={author} image={image} />
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
