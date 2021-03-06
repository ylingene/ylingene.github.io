import { graphql } from "gatsby"

export const imageFragment = graphql`
    fragment ImageFragment on ImageSharp {
        gatsbyImageData
    }
`

export const metaImageFragment = graphql`
    fragment MetaImageFragment on ImageSharp {
        original {
            src
            height
            width
        }
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
                ...MetaImageFragment
            }
        }
    }
`
