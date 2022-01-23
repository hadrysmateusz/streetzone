import { Helmet } from "react-helmet"

import { CONST } from "../../constants"

export const HelmetBasics: React.FC<
  { title: string; fullTitle?: undefined } | { fullTitle: string; title?: undefined }
> = ({ title, fullTitle }) => (
  <Helmet>
    <title>{fullTitle || `${title} | ${CONST.BRAND_NAME}`}</title>
  </Helmet>
)

export default HelmetBasics
