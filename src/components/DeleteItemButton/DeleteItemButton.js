import { withRouter, Link } from "react-router-dom"

import { route } from "../../utils"

import { Button } from "../Button"

const DeleteButton = withRouter(({ id, location }) => (
  <Button
    fullWidth
    as={Link}
    to={{ pathname: route("ITEM_DELETE", { id }), state: { redirectTo: location } }}
  >
    Usuń
  </Button>
))

export default DeleteButton
