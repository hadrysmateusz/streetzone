import { CONST } from "../../constants"

type Option = { value: string; label: string }

export const sortingOptions: Option[] = [
  {
    value: CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX,
    label: "Najnowsze",
  },
  {
    value: CONST.ITEMS_MARKETPLACE_PRICE_ASC_ALGOLIA_INDEX,
    label: "Cena rosnąco",
  },
]
