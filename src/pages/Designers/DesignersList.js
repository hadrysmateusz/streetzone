import { useMemo } from "react"
import { connectInfiniteHits } from "react-instantsearch-core"

import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"
import { encodeURL } from "../../utils/algoliaURLutils"
import { ROUTES } from "../../constants"

import { chars } from "./misc"
import {
  LetterNavbar,
  LetterNavbarContainer,
  List,
  ListContainer,
  NavLetterContainer,
  OuterContainer,
  SectionContainer,
  SectionLetter,
  StyledLink,
} from "./DesignersList.styles"

const DesignerLink = ({ value }) => (
  <div>
    <StyledLink to={encodeURL({ designers: [value] }, ROUTES.MARKETPLACE)}>{value}</StyledLink>
  </div>
)

const NavLetter = ({ value, isEmpty }) => {
  const onClick = () => {
    // if a section is empty it doesn't appear so exit
    if (isEmpty) return

    document
      .getElementById(`designers-list-section-${value}`)
      .scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <NavLetterContainer isEmpty={isEmpty} onClick={onClick}>
      {value}
    </NavLetterContainer>
  )
}

const ListSection = ({ letter, items }) => {
  if (!items || items.length === 0) return null

  return (
    <SectionContainer id={`designers-list-section-${letter}`}>
      <SectionLetter>{letter}</SectionLetter>
      <List>
        {items.map((designer) => (
          <DesignerLink value={designer.label} key={designer.id} />
        ))}
      </List>
    </SectionContainer>
  )
}

export const DesignersList = connectInfiniteHits(({ hits }) => {
  const groupedHits = useMemo(
    () =>
      hits.reduce(
        (acc, curr, i) => {
          var firstLetter = curr.label[0]

          var regex = /[A-Z]/g
          var isLetter = firstLetter.match(regex)
          if (!isLetter) {
            acc["#"].push(curr)
            return acc
          }

          if (acc[firstLetter]) {
            acc[firstLetter].push(curr)
            return acc
          } else {
            acc[firstLetter] = [curr]
            return acc
          }
        },
        { "#": [] }
      ),
    [hits]
  )

  return (
    <OuterContainer>
      <LetterNavbarContainer>
        <LetterNavbar>
          {chars.map((char) => {
            const isEmpty = !groupedHits[char] || groupedHits[char].length === 0
            return <NavLetter key={char} isEmpty={isEmpty} value={char} />
          })}
        </LetterNavbar>
      </LetterNavbarContainer>

      <ListContainer>
        <AlgoliaSearchBox placeholder="Szukaj" />
        {Object.entries(groupedHits).map(([letter, items]) => (
          <ListSection letter={letter} items={items} key={letter} />
        ))}
      </ListContainer>
    </OuterContainer>
  )
})
