import React from "react"
import { graphql } from "gatsby"

import { ACCENT_RED } from "../utils/defs"
import Blog from "../components/blog/blog"

const Collections = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Blog
      headerData={{
        accentColor: ACCENT_RED,
        title: "Collections",
        sectionTitle: "Photography",
        description:
          "Moments from my past trips for your viewing pleasure. More recent collections include photographs captured on both digital and film.",
      }}
      posts={posts}
    />
  )
}

export default Collections

export const pageQuery = graphql`
         query {
           allMarkdownRemark(
             sort: { fields: [frontmatter___date], order: DESC }
           ) {
             nodes {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "YYYY")
                  title
                  description
                  location
                  backgroundColor
                  hero {
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
       `
