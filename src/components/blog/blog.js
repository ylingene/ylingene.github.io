import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import PropTypes from "prop-types"

import Seo from "../seo"
import Container from "../container/container"
import Header from "../header/header"

import {
  header,
  hero,
  heroWrapper,
  post,
} from "./style.scss"

const BlogPost = ({ frontmatter, fields, excerpt }) => {
  const backgroundColor = frontmatter.backgroundColor ? {backgroundColor: frontmatter.backgroundColor} : {}
  return (
    <article key={fields.slug} style={backgroundColor}>
      <Link to={fields.slug} className={post}>
        {!!frontmatter.hero && (
          <div className={heroWrapper}>
            <Image
              alt={frontmatter.heroAlt}
              className={hero}
              fluid={frontmatter.hero.childImageSharp.fluid}
            />
          </div>
        )}
        <header className={header}>
          <small>{frontmatter.location}</small>
          <h2>{frontmatter.title}</h2>
          <small>{frontmatter.date}</small>
        </header>
      </Link>
    </article>
  )
}

BlogPost.defaultProps = {
  excerpt: ``,
}

BlogPost.propTypes = {
  frontmatter: PropTypes.shape({
    date: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    backgroundColor: PropTypes.string,
    hero: PropTypes.object,
    heroAlt: PropTypes.string,
  }).isRequired,
  fields: PropTypes.shape({
    slug: PropTypes.string,
  }).isRequired,
  excerpt: PropTypes.string,
}

const Blog = ({ headerData, posts }) => {
    return (
      <Container>
        <Seo title={headerData.sectionTitle} description={headerData.description} />
        <Header {...headerData} />
        {posts.map(BlogPost)}
      </Container>
    )
}

Blog.propTypes = {
  headerData: PropTypes.shape({
    sectionTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  posts: PropTypes.array.isRequired,
}

export default Blog
