import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import PropTypes from "prop-types"

import Seo from "../seo"
import Container from "../container/container"
import Header from "../header/header"

import {
    header,
    hero,
    heroWrapper,
    post,
    postDetail,
    postTitle,
} from "./style.scss"

const CollectionPost = ({ frontmatter, fields, excerpt }) => {
    return (
        <article
            key={fields.slug}
            style={{ backgroundColor: frontmatter.backgroundColor }}
        >
            <Link to={fields.slug} className={post}>
                <div className={heroWrapper}>
                    <GatsbyImage
                        alt={frontmatter.heroAlt}
                        className={hero}
                        image={frontmatter.hero.childImageSharp.gatsbyImageData}
                    />
                </div>
                <header className={header}>
                    <small className={postDetail}>{frontmatter.location}</small>
                    <h2 className={postTitle}>{frontmatter.title}</h2>
                    <small className={postDetail}>{frontmatter.date}</small>
                </header>
            </Link>
        </article>
    )
}

CollectionPost.defaultProps = {
    excerpt: ``,
}

CollectionPost.propTypes = {
    frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        location: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        hero: PropTypes.object.isRequired,
        heroAlt: PropTypes.string.isRequired,
    }).isRequired,
    fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
    }).isRequired,
    excerpt: PropTypes.string,
}

const Collection = ({ headerData, posts }) => {
    return (
        <Container>
            <Seo
                title={headerData.sectionTitle}
                description={headerData.description}
            />
            <Header {...headerData} />
            {posts.map(CollectionPost)}
        </Container>
    )
}

Collection.propTypes = {
    headerData: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        description: PropTypes.string,
    }).isRequired,
    posts: PropTypes.array.isRequired,
}

export default Collection
