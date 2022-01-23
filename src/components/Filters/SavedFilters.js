import { Component } from "react"
import { compose } from "recompose"
import withRouter from "react-router-dom/withRouter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { nanoid } from "nanoid"
import { Link } from "react-router-dom"
import { Form, Field } from "react-final-form"

import { LoaderButton, ButtonContainer } from "../Button"
import { withAuthentication } from "../UserSession"
import { AdaptiveFoldable } from "../Foldable"
import { withFirebase } from "../Firebase"
import { Input } from "../FormElements"

import { ListItem } from "./StyledComponents"
import validate from "./SavedFilters.validate"

export class SavedFilters extends Component {
  state = { filters: [] }

  componentDidMount = () => {
    this.getSavedFilters()
  }

  getSavedFilters = () => {
    const user = this.props.authUser
    if (user.savedFilters) {
      this.setState({ filters: user.savedFilters })
    }
  }

  onSubmit = async (values, form) => {
    const { location, authUser, firebase } = this.props

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
    this.getSavedFilters()

    // Reset the form
    setTimeout(form.reset)
  }

  removeFilter = async (id) => {
    const { authUser, firebase } = this.props

    const userId = authUser.uid
    const savedFilters = authUser.savedFilters.filter((filter) => filter.id !== id)

    // Update the user with the new list of filters
    await firebase.user(userId).update({ savedFilters })

    // Get the new information
    this.getSavedFilters()
  }

  render() {
    const { ...rest } = this.props

    return (
      <AdaptiveFoldable {...rest}>
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
            return (
              <form onSubmit={handleSubmit}>
                <ButtonContainer>
                  <Field name="name">
                    {({ input, meta }) => {
                      const error = meta.error && meta.touched ? meta.error : null
                      return <Input {...input} type="text" placeholder="Nazwa" error={error} />
                    }}
                  </Field>

                  <LoaderButton
                    text="OK"
                    type="submit"
                    primary
                    isLoading={submitting}
                    disabled={submitting || pristine}
                  />
                </ButtonContainer>
              </form>
            )
          }}
        />
        <div>
          {this.state.filters.map((filter) => (
            <ListItem key={filter.id}>
              <Link to={{ search: `?search=${filter.query}` }}>{filter.name} </Link>
              <FontAwesomeIcon icon="times" onClick={() => this.removeFilter(filter.id)} />
            </ListItem>
          ))}
        </div>
      </AdaptiveFoldable>
    )
  }
}

export default compose(withAuthentication, withFirebase, withRouter)(SavedFilters)
