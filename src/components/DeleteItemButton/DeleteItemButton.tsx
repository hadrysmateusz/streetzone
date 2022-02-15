import { Link, useLocation } from "react-router-dom"

import { route } from "../../utils"

import { Button } from "../Button"

const DeleteItemButton: React.FC<{ id: string }> = ({ id }) => {
  const location = useLocation()
  return (
    <Button
      fullWidth
      as={Link}
      to={{
        pathname: route("ITEM_DELETE", { id }),
        state: { redirectTo: location },
      }}
    >
      Usuń
    </Button>
  )
}

export default DeleteItemButton
