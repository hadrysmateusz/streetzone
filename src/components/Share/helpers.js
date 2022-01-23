import { CONST } from "../../constants"

export function getUrl(incomingUrl) {
  if (!incomingUrl) {
    return window.location.href
  }

  if (incomingUrl.startsWith(CONST.PROD_URL)) {
    return incomingUrl
  }

  return CONST.PROD_URL + incomingUrl
}
