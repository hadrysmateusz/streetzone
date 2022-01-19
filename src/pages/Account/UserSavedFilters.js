import React, { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"

import { PageContainer } from "../../components/Containers"
import { TextBlock, Text } from "../../components/StyledComponents"
import { ROUTES } from "../../constants"

import { encodeURL } from "../../utils/algoliaURLutils"
import { useFirebase } from "../../hooks"

import { FiltersItemContainer } from "./StyledComponents"

const FilterItem = ({ id, filterName, ...values }) => {
  const [designer, setDesigner] = useState(null)
  const firebase = useFirebase()

  const getDesigner = useCallback(
    async (selectedDesigner) => {
      const snap = await firebase.designers().where("label", "==", selectedDesigner).get()

      let designersArr = []
      snap.forEach((a) => {
        designersArr.push(a.data())
      })

      setDesigner(designersArr[0])
    },
    [firebase]
  )

  useEffect(() => {
    if (values.designers.length === 1) {
      getDesigner(values.designers)
    }
  }, [getDesigner, values.designers])

  return (
    <Link to={encodeURL(values, ROUTES.MARKETPLACE)}>
      <FiltersItemContainer>
        <TextBlock bold size="m">
          {filterName}
        </TextBlock>
        {Object.entries(values).reduce((acc, [key, val], i) => {
          if (Array.isArray(val)) {
            return [
              ...acc,
              <TextBlock>
                <Text bold>{key}</Text> <Text>{val.join(", ")}</Text>
              </TextBlock>,
            ]
          } else if (typeof val === "object") {
            return [
              ...acc,
              <TextBlock>
                <Text bold>{key}</Text>{" "}
                {Object.entries(val).map(([subKey, subVal]) => (
                  <>
                    <Text bold>{subKey}</Text> <Text>{subVal}</Text>
                  </>
                ))}
              </TextBlock>,
            ]
          } else {
            return [
              ...acc,
              <TextBlock>
                <Text bold>{key}</Text> <Text>{val}</Text>
              </TextBlock>,
            ]
          }
        }, [])}
      </FiltersItemContainer>
    </Link>
  )
}

const UserSavedFilters = ({ user, isAuthorized }) => {
  return (
    <PageContainer>
      {user.savedFilters.map((filter) => {
        const parsedQuery = JSON.parse(filter.query)
        return (
          <FilterItem
            id={filter.id}
            filterName={filter.name}
            categories={parsedQuery.category}
            designers={parsedQuery.designers}
            size={parsedQuery.size}
            condition={parsedQuery.condition}
            price={parsedQuery.price}
            query={parsedQuery.query}
          />
        )
      })}
    </PageContainer>
  )
}

export default UserSavedFilters
