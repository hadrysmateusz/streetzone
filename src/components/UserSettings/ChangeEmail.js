import { useState, useEffect } from "react"

import { useFunctionWithReauthentication } from "../../pages/Auth/Reauthentication"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"

import LoadingSpinner from "../LoadingSpinner"
import ErrorBox from "../ErrorBox"
import { ChangeEmailForm } from "./ChangeEmailForm"

const ChangeEmail = () => {
  const authUser = useAuthentication()
  const firebase = useFirebase()
  const [initialValues, setInitialValues] = useState(null)
  const [error, setError] = useState(null)
  const flashMessage = useFlash()

  const [updateEmailWithReauthentication, reauthenticationModal] = useFunctionWithReauthentication(
    async (email) => {
      try {
        // update auth user email
        await firebase.updateEmail(email)

        // update email in database
        await firebase.user(authUser.uid).update({ email })

        flashMessage({ type: "success", text: "Zmiany zostały zapisane" })
      } catch (error) {
        flashMessage({
          type: "error",
          text: "Wystąpił błąd",
          details: "Zmiany mogły nie zostać zapisane",
        })
      }
    }
  )

  // set initialValues for the form
  useEffect(() => {
    setInitialValues({
      email: authUser.email,
    })
  }, [authUser.email])

  // submit handler
  const onSubmit = async (values) => {
    try {
      setError(null)
      const email = values.email || initialValues.email

      if (!email) {
        throw Error("Podaj adres e-mail")
      }

      await updateEmailWithReauthentication(email)
    } catch (err) {
      setError(err)
    }
  }

  const isLoading = !initialValues

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      {reauthenticationModal()}
      <ChangeEmailForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onCancel={() => {
          setError(null)
        }}
      />
      <ErrorBox error={error} />
    </>
  )
}

export default ChangeEmail
