import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import { ACCENT_BLUE } from "../utils/defs"
import Portfolio from "../components/portfolio/portfolio"

const Photography = ({ data }) => {
  return (
    <Portfolio
      description="Currated photography portfolio from over the years."
      headerData={{
        accentColor: ACCENT_BLUE,
        title: "Gallery",
        sectionTitle: "Photography",
      }}
      filters={['portrait', 'landscape', 'environment']}
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
