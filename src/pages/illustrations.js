import React from "react"

import { ACCENT_GREEN } from "../utils/defs"
import Portfolio from "../components/portfolio/portfolio"

const Illustrations = ({ data }) => {
  return (
    <Portfolio
      headerData={{
        accentColor: ACCENT_GREEN,
        title: "Gallery",
        sectionTitle: "Illustrations",
      }}
      fluidImages={[]}
    />
  )
}

export default Illustrations
