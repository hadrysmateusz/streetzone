import { Component } from "react"
import { Form, Field } from "react-final-form"
import { nanoid } from "nanoid"

import { withAuthentication } from "../../../components/UserSession"
import { LoaderButton } from "../../../components/Button"
import { FieldLabel } from "../../../components/Basics"
import { FormError, Input } from "../../../components/FormElements"
import { FileHandler } from "../../../components/FileHandler"
import { ITEM_SCHEMA, CONST } from "../../../constants"
import categories from "../../../constants/itemCategories"
import sizes from "../../../constants/sizes"
import { formatItemDataForDb, MODE } from "../../../utils/formatting/formatItemData"
import getRandomInteger from "../../../utils/getRandomInteger"

class NewItemPage extends Component {
  state = { isLoading: false }

  uploadItem = async (values) => {
    try {
      const { firebase } = this.props
      const files = values.files
      const itemId = nanoid()

      // Look for the document with correct id
      const userSnap = await this.props.firebase.user(values.userId).get()
      // If the user isn't found throw an error
      if (!userSnap.exists) throw new Error("Nie znaleziono użytkownika")

      // Get main image ref
      const mainImageIndex = files.findIndex((a) => a.isMain)

      // Upload files to storage and get their refs
      const attachments = await Promise.all(
        files.map(async (file) => {
          const snapshot = await firebase.uploadFile(
            `${CONST.STORAGE_BUCKET_ITEM_ATTACHMENTS}/${values.userId}/${itemId}`,
            file.data
          )
          return snapshot.ref.fullPath
        })
      )

      // Format data
      const formattedData = formatItemDataForDb(
        { ...values, attachments, mainImageIndex, itemId },
        MODE.CREATE
      )

      // Add item to database
      await firebase.item(formattedData.id).set(formattedData)

      return
    } catch (error) {
      alert("Wystąpił problem podczas wystawiania przedmiotu")
      console.error(error)
    }
  }

  onSubmit = async (values, form) => {
    const availableDesigners = (
      await this.props.firebase.db.collection("designers").get()
    ).docs.map((doc) => doc.data())

    const availableNames = [
      "Fajne ale drogie",
      "O takie coś",
      "Rzecz",
      "Przykładowy itemek",
      "Kolejny cuś",
      "Super cośtam 2000",
      "Przedmiot 75",
    ]

    const availableCategories = Object.values(ITEM_SCHEMA.categories)

    const usersSnapshot = await this.props.firebase.db.collection("users").get()
    const usersDocsSnapshot = usersSnapshot.docs
    const availableUserIds = usersDocsSnapshot.map((doc) => doc.id)

    for (let i = 0; i < values.numberOfItems; i++) {
      // name
      const name = availableNames[getRandomInteger(0, availableNames.length - 1)]

      // category
      const category = availableCategories[getRandomInteger(0, availableCategories.length - 1)]

      // designers
      let designers = []
      const nOfDesigners = getRandomInteger(1, 3)
      for (let i = 0; i < nOfDesigners; i++) {
        designers.push(availableDesigners[getRandomInteger(0, availableDesigners.length - 1)].label)
      }
      designers = designers.reduce((acc, curr) => (!acc.includes(curr) ? [...acc, curr] : acc), [])

      // price
      const price = getRandomInteger(50, 3500)

      // userId
      const userId = values.randomUsers
        ? availableUserIds[getRandomInteger(0, availableUserIds.length - 1)]
        : this.props.authUser.uid

      // condition
      const condition = getRandomInteger(5, 11)

      // size
      let sizeCategory
      if (category === categories.akcesoria) {
        sizeCategory = "accessories"
      } else if (category === categories.buty) {
        sizeCategory = "shoes"
      } else {
        sizeCategory = "clothes"
      }

      let size
      const availableSizes = sizes[sizeCategory]
      size = sizeCategory + "-" + availableSizes[getRandomInteger(0, availableSizes.length - 1)]

      // description
      let description = await fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1")
      description = (await description.json())[0]

      // files
      const nOfAllFiles = values.files.length
      const nOfFiles = Math.min(nOfAllFiles, getRandomInteger(1, CONST.ATTACHMENTS_MAX_COUNT))
      const lastAvailableStartIndex = nOfAllFiles - nOfFiles
      const startIndex = getRandomInteger(0, lastAvailableStartIndex)

      let files = values.files.slice(startIndex, startIndex + nOfFiles)

      await this.uploadItem({
        name,
        designers,
        price,
        userId,
        category,
        condition,
        size,
        description,
        files,
      })
    }
    setTimeout(form.reset)
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
          return (
            <form onSubmit={handleSubmit}>
              {/* Number of items */}
              <div>
                <Field>
                  {({ input, meta }) => {
                    const error = meta.error && meta.touched ? meta.error : null
                    return (
                      <Input
                        {...input}
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Number of items"
                        error={error}
                      />
                    )
                  }}
                </Field>
              </div>

              {/* Random users */}
              <div>
                <Field name="randomUsers">
                  {({ input, meta }) => (
                    <>
                      <FieldLabel>Random users </FieldLabel>
                      <input {...input} type="checkbox" />
                      <FormError message={meta.error} show={meta.error && meta.touched} />
                    </>
                  )}
                </Field>
              </div>

              {/* Files (handled by separate component) */}
              <div>
                <FieldLabel>Zdjęcia</FieldLabel>

                <Field name="files">
                  {({ input, meta }) => {
                    const error = meta.error && meta.touched ? meta.error.main : null
                    const itemErrors = meta.error ? meta.error.specific : null
                    return <FileHandler {...input} error={error} itemErrors={itemErrors} />
                  }}
                </Field>
              </div>

              <LoaderButton
                text="Gotowe"
                type="submit"
                isLoading={submitting}
                disabled={submitting || pristine}
              />
              {/* 
								{process.env.NODE_ENV === "development" && (
									<pre>{JSON.stringify(values, 0, 2)}</pre>
								)} */}
            </form>
          )
        }}
      />
    )
  }
}

export default withAuthentication(NewItemPage)
