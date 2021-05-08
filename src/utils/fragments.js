import { graphql } from "gatsby"

export const imageFragment = graphql`
         fragment ImageFragment on ImageSharp {
           gatsbyImageData
         }
       `

export const galleryImageFragment = graphql`
         fragment GalleryImageFragment on Yaml {
           alt
           type
           image {
             id
             childImageSharp {
               ...ImageFragment
             }
           }
         }
       `