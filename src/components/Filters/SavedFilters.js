import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { nanoid } from "nanoid"
import { Link, useLocation } from "react-router-dom"

import { useAuthentication, useFirebase } from "../../hooks"

import { ButtonContainer } from "../Button"
import { AdaptiveFoldable } from "../Foldable"

import { ListItem } from "./Common.styles"
import validate from "./SavedFilters.validate"
import {
  FormSubmitButton,
  TextInputFFUnwrapped,
} from "../FinalFormFields"
import { FinalFormSimpleForm } from "../FinalFormSimpleForm"

export const SavedFilters = () => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const location = useLocation()

  const [filters, setFilters] = useState([])

  const getSavedFilters = useCallback(() => {
    setFilters(authUser.savedFilters ?? [])
  }, [authUser.savedFilters])

  useEffect(() => {
    getSavedFilters()
  }, [getSavedFilters])

  const onSubmit = useCallback(
    async (values, form) => {
      const userId = authUser.uid
      const paramsString = location.search
      const searchParams = new URLSearchParams(paramsString)

      const query = searchParams.get("search") || ""
      const name = values.name
      const id = nanoid()

      const newFilter = { name, query, id }
      const savedFilters = [...authUser.savedFilters, newFilter]

      // Update the user with the new list of filters
      await firebase.user(userId).update({ savedFilters })

      // Get the new information
      getSavedFilters()

      // Reset the form
      setTimeout(form.reset)
    },
    [
      authUser.savedFilters,
      authUser.uid,
      firebase,
      getSavedFilters,
      location.search,
    ]
  )

  const removeFilter = async (id) => {
    const userId = authUser.uid
    const savedFilters = authUser.savedFilters.filter(
      (filter) => filter.id !== id
    )

    // Update the user with the new list of filters
    await firebase.user(userId).update({ savedFilters })

    // Get the new information
    getSavedFilters()
  }

  return (
    <AdaptiveFoldable>
      <FinalFormSimpleForm onSubmit={onSubmit} validate={validate}>
        <ButtonContainer>
          <TextInputFFUnwrapped name="name" placeholder="Nazwa" />
          <FormSubmitButton text="OK" fullWidth={false} />
        </ButtonContainer>
      </FinalFormSimpleForm>

      <div>
        {filters.map((filter) => (
          <ListItem key={filter.id}>
            <Link to={{ search: `?search=${filter.query}` }}>
              {filter.name}{" "}
            </Link>
            <FontAwesomeIcon
              icon="times"
              onClick={() => removeFilter(filter.id)}
            />
          </ListItem>
        ))}
      </div>
    </AdaptiveFoldable>
  )
}
