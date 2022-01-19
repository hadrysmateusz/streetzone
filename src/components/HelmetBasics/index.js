import React from "react"
import { Helmet } from "react-helmet"

import { CONST } from "../../constants"

const HelmetBasics = ({ title, fullTitle }) => {
  return (
    <Helmet>
      <title>{fullTitle || `${title} | ${CONST.BRAND_NAME}`}</title>
    </Helmet>
  )
}

export default HelmetBasics
