import React from "react"
import { graphql } from "gatsby"

import { ACCENT_BLUE } from "../utils/defs"
import Portfolio from "../components/portfolio/portfolio"

const Photography = ({ data }) => {
  return (
    <Portfolio
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
                 alt
                 orientation
                 thumbnailPosition
                 type
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
       `
