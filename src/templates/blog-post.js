import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Container from "../components/container/container"
import Gallery from "../components/gallery/gallery"
import SEO from "../components/seo"
import { COLLECTIONS_PATH } from "../utils/defs"

import style from "./style.scss"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const images = post.frontmatter.photos.childrenYaml
  // const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Container>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className={style.headerSection}>
        <header className={style.header}>
          <h3>{post.frontmatter.location}</h3>
          <h1
            style={{
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <small
            style={{
              display: `block`,
            }}
          >
            {post.frontmatter.date}
          </small>
        </header>
        <Link to={COLLECTIONS_PATH}>back to collections</Link>
      </div>
      <article>
        <section
          className={style.content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
      <Gallery fluidImages={images} />
      <hr />
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Container>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
         query BlogPostBySlug($slug: String!) {
           site {
             siteMetadata {
               title
             }
           }
           markdownRemark(fields: { slug: { eq: $slug } }) {
             id
             excerpt(pruneLength: 160)
             html
             frontmatter {
               title
               date(formatString: "MMMM YYYY")
               description
               location
               photos {
                 childrenYaml {
                   image {
                     id
                     childImageSharp {
                       fluid(maxWidth: 1400) {
                         ...GatsbyImageSharpFluid
                       }
                     }
                   }
                 }
               }
             }
           }
         }
       `
