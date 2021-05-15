import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Container from "../components/container/container"
import Seo from "../components/seo"
import { HOME_PATH } from "../utils/defs"

const NotFoundPage = ({ data, location }) => {
    console.log(HOME_PATH)
    return (
        <Container>
            <Seo />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div>
                    <div style={{ maxWidth: 800 }}>
                        <StaticImage
                            src="../../content/images/photography/japan-2018/arashiyama.jpg"
                            alt="Arashiyama"
                        />
                    </div>
                    <h1>Not Found</h1>
                    <p>
                        This page doesn't exist. Please head back{" "}
                        <Link to={HOME_PATH}>here</Link>.
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default NotFoundPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
