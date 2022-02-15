import { useHistory } from "react-router-dom"

import { Button } from "../Button"
import { route } from "../../utils"

const ClearAllFiltersButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const history = useHistory()

  return (
    <Button
      danger
      onClick={() => {
        history.replace(route("MARKETPLACE"))
        onClick()
      }}
      fullWidth
    >
      Wyczyść filtry
    </Button>
  )
}

export default ClearAllFiltersButton
