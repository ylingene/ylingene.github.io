// custom typefaces
import "@fontsource/inter" // Default weight 400.
import "@fontsource/inter/700.css" // Weight 700.
import "@fontsource/roboto" // Default weight 400.

import "./src/styles/global.scss"

import React from "react"
import Layout from "./src/components/layout/layout"

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
