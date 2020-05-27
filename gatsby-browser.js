// custom typefaces
import "typeface-inter"
import "typeface-roboto"

import "./src/styles/global.scss"

import React from "react"
import Layout from "./src/components/layout/layout"

// Wraps every page in a component
// all props avaiable to a page will be available to Layout (incl. location prop)
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
