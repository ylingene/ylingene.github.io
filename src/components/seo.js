/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

const Seo = ({ description, lang, meta, title }) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `
    )

    const metaDescription = description || site.siteMetadata.description

    /**
     * `titleTemplate` is the text that's shown in the browser tab, with `title`
     * being inserted in the %s. If empty, it displays the `defaultTitle`
     * Example 1: title is Photography -> "Photography | Lingene Yang"
     * Example 2: title is undefined -> "Lingene Yang"
     */
    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            defaultTitle={site.siteMetadata.title}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
            ].concat(meta)}
        />
    )
}

Seo.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
    title: undefined,
}

Seo.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
}

export default Seo
