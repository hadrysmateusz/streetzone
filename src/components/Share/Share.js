import { TextBlock } from "../StyledComponents"

import Facebook from "./Facebook"
import Twitter from "./Twitter"
import Email from "./Email"
import { ShareContainer } from "./Share.styles"
import { getUrl } from "./helpers"

const Share = ({ withHeader, url }) => {
  let finalUrl = getUrl(url)

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {withHeader && (
        <TextBlock size="xs" uppercase color="gray0">
          Udostępnij
        </TextBlock>
      )}
      <ShareContainer>
        <Facebook url={finalUrl} />
        <Twitter url={finalUrl} />
        {/* <Reddit url={finalUrl}/> */}
        <Email url={finalUrl} />
      </ShareContainer>
    </div>
  )
}

export default Share
