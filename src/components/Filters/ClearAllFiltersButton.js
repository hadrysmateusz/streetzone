import { withRouter } from "react-router-dom"

import { ROUTES } from "../../constants"

import { Button } from "../Button"

const ClearAllFiltersButton = withRouter(({ history, onClick }) => (
  <Button
    danger
    onClick={() => {
      history.replace(ROUTES.MARKETPLACE)
      onClick(true)
    }}
    fullWidth
  >
    Wyczyść filtry
  </Button>
))

export default ClearAllFiltersButton
