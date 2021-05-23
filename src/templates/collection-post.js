import React from "react"
import { Link, graphql } from "gatsby"
import PropTypes from "prop-types"

import Container from "../components/container/container"
import Gallery from "../components/gallery/gallery"
import Seo from "../components/seo"
import { COLLECTIONS_PATH } from "../utils/defs"

import {
    backLinkNavigation,
    collectionNavigation,
    content,
    contentSection,
    header as headerStyle,
} from "./style.scss"

const CollectionTemplate = ({ data, pageContext }) => {
    const post = data.markdownRemark
    const images = post.frontmatter.photos
        ? post.frontmatter.photos.childrenYaml
        : []
    const metaImage = post.frontmatter.hero.childImageSharp.original
    const { previous, next } = pageContext

    return (
        <Container>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
                metaImage={metaImage}
            />
            <header className={headerStyle}>
                <h3>{post.frontmatter.location}</h3>
                <h1>{post.frontmatter.title}</h1>
                <small>{post.frontmatter.date}</small>
            </header>
            <div className={contentSection}>
                <article>
                    <section
                        className={content}
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </article>
                <div className={backLinkNavigation}>
                    <Link to={COLLECTIONS_PATH}>back to collections</Link>
                </div>
            </div>
            <Gallery fluidImages={images} />
            <nav>
                <ul className={collectionNavigation}>
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

CollectionTemplate.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            id: PropTypes.string,
            excerpt: PropTypes.string,
            html: PropTypes.string,
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
                description: PropTypes.string,
                hero: PropTypes.shape({
                    childImageSharp: PropTypes.shape({
                        original: PropTypes.shape({
                            src: PropTypes.string,
                            height: PropTypes.number,
                            width: PropTypes.number,
                        }),
                    }),
                }),
                location: PropTypes.string,
                photos: PropTypes.shape({
                    childrenYaml: PropTypes.array,
                }),
            }),
        }),
    }).isRequired,
    pageContext: PropTypes.object.isRequired,
}

export default CollectionTemplate

export const pageQuery = graphql`
    query CollectionBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM YYYY")
                description
                hero {
                    childImageSharp {
                        ...MetaImageFragment
                    }
                }
                location
                photos {
                    childrenYaml {
                        ...GalleryImageFragment
                    }
                }
            }
        }
    }
`
