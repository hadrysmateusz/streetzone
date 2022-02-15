import { useState } from "react"

import { useFirebase } from "../../../hooks"

import { Button } from "../../../components/Button"
import FormError from "../../../components/FormElements/HelperComponents/FormError"
import Separator from "../../../components/Separator"
import { Modal } from "../../../components/Modal"

import { socialMediaSites } from "../helpers"

import {
  EmailContainer,
  InfoContainer,
  ModalOuterContainer,
  SocialContainer,
} from "./Reauthentication.styles"
import ReauthenticationForm from "./ReauthenticationForm"

export const useFunctionWithReauthentication = (fn) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [args, setArgs] = useState()

  const wrappedFunction = async (...newArgs) => {
    // store the arguments with which to invoke the function inside the modal
    setArgs(newArgs)

    try {
      return await fn(...newArgs)
    } catch (error) {
      // rethrow errors other than requires-recent-login
      if (error.code !== "auth/requires-recent-login") {
        throw error
      }

      openModal()
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const renderModal = () =>
    isModalOpen ? (
      <ReauthenticationModal
        onSuccess={() => fn(...args)}
        onRequestClose={closeModal}
      />
    ) : null

  return [wrappedFunction, renderModal]
}

const SocialReauthenticationButton = ({
  onError,
  onSuccess,
  name: nameOfSite,
  buttonText,
  provider,
}) => {
  const firebase = useFirebase()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = firebase.auth.currentUser

      await user.reauthenticateWithPopup(firebase[provider])

      // exit successfully
      onSuccess()
    } catch (err) {
      // pass the error to handler
      onError(err)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Button social={nameOfSite} fullWidth>
        {buttonText}
      </Button>
    </form>
  )
}

export const GoogleReauthButton = (props) => (
  <SocialReauthenticationButton {...socialMediaSites.google} {...props} />
)

export const FacebookReauthButton = (props) => (
  <SocialReauthenticationButton {...socialMediaSites.facebook} {...props} />
)

const ReauthenticationModal = ({ onSuccess, onRequestClose }) => {
  const [error, setError] = useState()
  const firebase = useFirebase()

  const onError = (err) => {
    setError(err)
  }

  const onSuccessfulReauthentication = async () => {
    // invoke the callback
    await onSuccess()
    // close the modal
    onRequestClose()
  }

  const onFormSubmit = async (values, _form) => {
    try {
      // get credentials from firebase
      const user = firebase.auth.currentUser
      const credential = firebase.emailAuthProvider.credential(
        user.email,
        values.password
      )

      // reauthenticate with new credentials
      await user.reauthenticateWithCredential(credential)

      // exit successfully
      onSuccessfulReauthentication()
    } catch (err) {
      onError(err)
    }
  }

  const socialProps = {
    onSuccess: onSuccessfulReauthentication,
    onError,
  }

  return (
    <Modal onRequestClose={onRequestClose}>
      <ModalOuterContainer>
        <InfoContainer>
          Aby dokończyć tę czynność, potwierdź że jesteś właścicielem tego
          konta.
        </InfoContainer>
        <Separator>użyj konta społecznościowego </Separator>
        <SocialContainer>
          <GoogleReauthButton {...socialProps} />
          <FacebookReauthButton {...socialProps} />
        </SocialContainer>
        <Separator>lub podaj hasło</Separator>
        <EmailContainer>
          <ReauthenticationForm onError={onError} onSubmit={onFormSubmit} />
          <FormError error={error} />
        </EmailContainer>
      </ModalOuterContainer>
    </Modal>
  )
}

export default ReauthenticationModal
