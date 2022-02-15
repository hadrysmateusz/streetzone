import { useCallback } from "react"

import { useFlash } from "./useFlash"
import { useFirebase } from "./useFirebase"

/**
 * Returns a function that will delete a document in firestore and provides feedback on the results, a path can be passed to the returned function to override the one set in the hook
 * @param {string} path Slash separated path to the document
 * @param {string} message A message to be displayed in the confirmation prompt, if not provided a generic default will be used
 * @todo test overriding the path
 */
const useDeleteDocument = (path, message = "Na pewno? Tej akcji nie da się cofnąć.") => {
  const flashMessage = useFlash()
  const firebase = useFirebase()

  const deleteDocument = useCallback(
    async (overridePath) => {
      try {
        const shouldDelete = window.confirm(message)

        if (!shouldDelete) return

        // check if overridePath is an actual path and not undefined or an event object
        if (typeof overridePath === "string") {
          await firebase.db.doc(overridePath).delete()
        } else {
          await firebase.db.doc(path).delete()
        }

        flashMessage({ type: "success", text: "Usunięto" })
      } catch (error) {
        console.error(error)
        flashMessage({
          type: "error",
          text: "Błąd",
          details: "Więcej informacji w konsoli",
        })
      }
    },
    [firebase, flashMessage, message, path]
  )

  return deleteDocument
}

export default useDeleteDocument
