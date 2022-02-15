import { useEffect } from "react"
import { useHistory } from "react-router-dom"

import {
  isAuthenticated,
  withAuthorization,
} from "../../components/UserSession"
import { useNewDelayRender } from "../../hooks/useDelayRender"
import { route } from "../../utils"
import { MergedUser } from "../../types"

const MyAccountPage: React.FC<{ authUser: MergedUser }> = ({ authUser }) => {
  const history = useHistory()

  useEffect(() => {
    history.replace(route("ACCOUNT_ITEMS", { id: authUser.uid }))
  }, [authUser.uid, history])

  return useNewDelayRender(
    <div>Przekierowywanie do twojego profilu...</div>,
    600
  )
}

export default withAuthorization(
  isAuthenticated,
  "Zaloguj się by zobaczyć swój profil"
)(MyAccountPage)
