import FiltersBase, { Section } from "../../../components/Filters"
import AlgoliaRefinementList from "../../../components/Algolia/AlgoliaRefinementList"

import { FiltersHeader, FiltersOuterContainer } from "./Filters.styles"

const TABS = {
  category: {
    displayName: "Kategoria",
    id: "category",
  },
  designers: {
    displayName: "Projektanci",
    id: "designers",
  },
}

// TODO: these don't work on mobile yet
const Filters = ({ toggle, clear }) => {
  return (
    <FiltersOuterContainer>
      <FiltersHeader>Filtruj</FiltersHeader>
      <FiltersBase tabOptions={TABS} defaultTab="category" toggle={toggle} clear={clear}>
        {({ openTab, switchTab, tabs }) => {
          const commonProps = { openTab, toggle: switchTab }

          return (
            <>
              {/* Category */}
              <Section>
                <AlgoliaRefinementList
                  {...commonProps}
                  tab={tabs.category}
                  attribute="itemCategory"
                />
              </Section>

              {/* Designers */}
              <Section>
                {/* showMore is required by algolia to display a full list */}
                <AlgoliaRefinementList
                  {...commonProps}
                  tab={tabs.designers}
                  attribute="designers"
                  show={8}
                  searchable
                  showMore
                  startFolded
                />
              </Section>
            </>
          )
        }}
      </FiltersBase>
    </FiltersOuterContainer>
  )
}

export default Filters
