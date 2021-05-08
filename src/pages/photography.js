import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import { ACCENT_BLUE } from "../utils/defs"
import Portfolio from "../components/portfolio/portfolio"

const Photography = ({ data }) => {
  return (
    <Portfolio
      description="Lingene's photography portfolio."
      headerData={{
        accentColor: ACCENT_BLUE,
        title: "Gallery",
        sectionTitle: "Photography",
      }}
      filters={['environment', 'portrait', 'landscape']}
      fluidImages={data.allFile.nodes[0].childrenYaml}
    />
  )
}

Photography.propTypes = {
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

export default Photography

export const pageQuery = graphql`
         query {
           allFile(
             filter: {
               sourceInstanceName: { eq: "galleries" }
               name: { eq: "photography" }
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
