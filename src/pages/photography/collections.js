import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import { ACCENT_RED } from "../../utils/defs"
import Collection from "../../components/collection/collection"

const Collections = ({ data }) => {
    const posts = data.allMarkdownRemark.nodes

    return (
        <Collection
            headerData={{
                accentColor: ACCENT_RED,
                title: "Collections",
                sectionTitle: "Photography",
                description:
                    "Moments from my life and past trips. Photographs taken on both digital and film.",
            }}
            posts={posts}
        />
    )
}

Collections.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.object),
        }),
    }).isRequired,
}

export default Collections

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
                            ...ImageFragment
                        }
                    }
                    heroAlt
                }
            }
        }
    }
`
