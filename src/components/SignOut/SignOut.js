import { withRouter } from "react-router-dom"
import styled from "styled-components/macro"

import { useFirebase, useFlash } from "../../hooks"
import { route } from "../../utils"

import { StatefulModal } from "../Modal"
import { Button, ButtonContainer } from "../Button"
import PageHeading from "../PageHeading"

const ModalContainer = styled.div`
  padding: var(--spacing4);
`

export const SignOut = withRouter(({ history, children }) => {
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const onSignOut = () => {
    try {
      firebase.signOut()
      flashMessage({ type: "success", text: "Wylogowano" })
      history.push(route("HOME"))
    } catch {
      flashMessage({ type: "error", text: "Wystąpił błąd" })
    }
  }

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
                    // force-close modal even on HomePage
                    close()
                    // sign out
                    onSignOut()
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
})

export const SignOutButton = () => (
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
