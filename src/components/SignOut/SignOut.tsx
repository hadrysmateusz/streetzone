import { useCallback } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components/macro"

import { useFirebase, useFlash } from "../../hooks"
import { route } from "../../utils"

import { ModalRenderMethod, StatefulModal } from "../Modal"
import { Button, ButtonContainer } from "../Button"
import { PageHeading } from "../PageHeading"

const ModalContainer = styled.div`
  padding: var(--spacing4);
`

export const SignOut: React.FC<{ children: ModalRenderMethod }> = ({
  children,
}) => {
  const history = useHistory()
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const onSignOut = useCallback(async () => {
    try {
      await firebase.signOut()
      flashMessage({ type: "success", text: "Wylogowano" })
      history.push(route("HOME"))
    } catch {
      flashMessage({ type: "error", text: "Wystąpił błąd" })
    }
  }, [firebase, flashMessage, history])

  return (
    <StatefulModal>
      {({ open, close, isOpen, modal }) => (
        <>
          {children({ open, close, isOpen, modal })}
          {modal(
            <ModalContainer>
              <PageHeading>Na pewno wylogować?</PageHeading>
              <ButtonContainer vertical noMargin>
                <Button
                  onClick={() => {
                    close() // force-close modal even on HomePage
                    onSignOut() // sign out
                  }}
                  danger
                  big
                >
                  Tak, wyloguj
                </Button>
                <Button onClick={close}>Nie, wróć</Button>
              </ButtonContainer>
            </ModalContainer>
          )}
        </>
      )}
    </StatefulModal>
  )
}

export const SignOutButton: React.FC = () => (
  <SignOut>
    {({ open }) => (
      <Button type="button" onClick={open} fullWidth big>
        Wyloguj
      </Button>
    )}
  </SignOut>
)

// export const StatelessSignOut = withRouter(({ history, children }) => {
//   const firebase = useFirebase()
//   const flashMessage = useFlash()

//   const onSignOut = () => {
//     try {
//       firebase.signOut()
//       flashMessage({ type: "success", text: "Wylogowano" })
//       history.push(route("HOME"))
//     } catch {
//       flashMessage({ type: "error", text: "Wystąpił błąd" })
//     }
//   }

//   return (
//     <Modal>
//       {({ open, close, isOpen, modal }) => (
//         <>
//           {children({ open, close, isOpen, modal })}
//           {modal(
//             <ModalContainer>
//               <PageHeading>Na pewno wylogować?</PageHeading>
//               <ButtonContainer vertical noMargin>
//                 <Button onClick={onSignOut} danger big>
//                   Tak, wyloguj
//                 </Button>
//                 <Button onClick={close}>Nie, wróć</Button>
//               </ButtonContainer>
//             </ModalContainer>
//           )}
//         </>
//       )}
//     </Modal>
//   )
// })
