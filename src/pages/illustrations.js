import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import { ACCENT_GREEN } from "../utils/defs"
import Portfolio from "../components/portfolio/portfolio"

const Illustrations = ({ data }) => {
    return (
        <Portfolio
            description="Illustrations from my recent dabbling in digital painting."
            headerData={{
                accentColor: ACCENT_GREEN,
                title: "Gallery",
                sectionTitle: "Illustrations",
                description: "Coming soon.",
            }}
            fluidImages={data.allFile.nodes[0].childrenYaml}
        />
    )
}

Illustrations.propTypes = {
    data: PropTypes.shape({
        allFile: PropTypes.shape({
            nodes: PropTypes.arrayOf(
                PropTypes.shape({
                    childrenYaml: PropTypes.array,
                })
            ),
        }),
    }).isRequired,
}

export default Illustrations

export const pageQuery = graphql`
    query {
        allFile(
            filter: {
                sourceInstanceName: { eq: "galleries" }
                name: { eq: "illustrations" }
            }
        ) {
            nodes {
                childrenYaml {
                    ...GalleryImageFragment
                }
            }
        }
    }
`
