import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { withAuthentication, withAuthorization } from "../../components/UserSession"

import { useNewDelayRender } from "../../hooks/useDelayRender"
import { useAuthentication } from "../../hooks"
import { route } from "../../utils"

const MyAccount = ({ history }) => {
  const authUser = useAuthentication()

  history.replace(route("ACCOUNT_ITEMS", { id: authUser.uid }))

  return useNewDelayRender(<div>Przekierowywanie do twojego profilu...</div>, 600)
}

const condition = (authUser) => (!!authUser ? true : "Zaloguj się by zobaczyć swój profil")

export default compose(withAuthorization(condition), withAuthentication, withRouter)(MyAccount)
