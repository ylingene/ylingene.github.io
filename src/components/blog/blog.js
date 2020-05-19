import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"

// import Bio from "../bio"
// import SEO from "../seo"
import Container from "../container/container"
import Header from "../header/header"

import style from "./style.scss"

const BlogPost = ({ frontmatter, fields, excerpt }) => {
  const backgroundColor = frontmatter.backgroundColor ? {backgroundColor: frontmatter.backgroundColor} : {}
  return (
    <article key={fields.slug} style={backgroundColor}>
      <Link to={fields.slug} className={style.post}>
        {!!frontmatter.hero && (
          <div className={style.heroWrapper}>
            <Image
              fluid={frontmatter.hero.childImageSharp.fluid}
              className={style.hero}
            />
          </div>
        )}
        <header className={style.header}>
          <small>{frontmatter.location}</small>
          <h2>{frontmatter.title}</h2>
          <small>{frontmatter.date}</small>
        </header>
        {frontmatter.description && (
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: frontmatter.description || excerpt,
              }}
            />
          </section>
        )}
      </Link>
    </article>
  )
}

const Blog = ({ headerData, posts }) => {
    return (
      <Container>
        <Header {...headerData} />
        {posts.map(BlogPost)}
      </Container> 
    )
}

export default Blog

/*
    <Container>
      <SEO title="All posts" />
      <Bio />
      {posts...}
    </Container>
*/
