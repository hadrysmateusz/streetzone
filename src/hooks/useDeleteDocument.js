import { useCallback } from "react"
import { useFlash, useFirebase } from "."

/**
 * Returns a function that will delete a document in firestore and provides feedback on the results
 * @param {string} path Slash separated path to the document
 * @param {string} message A message to be displayed in the confirmation prompt, if not provided a generic default will be used
 */
const useDeleteDocument = (path, message = "Na pewno? Tej akcji nie da się cofnąć.") => {
	const flashMessage = useFlash()
	const firebase = useFirebase()

	const deleteDocument = useCallback(async () => {
		try {
			const shouldDelete = window.confirm(message)

			if (shouldDelete) {
				await firebase.db.doc(path).delete()
			}

			flashMessage({ type: "success", text: "Usunięto" })
		} catch (error) {
			console.error(error)
			flashMessage({
				type: "error",
				text: "Błąd",
				details: "Więcej informacji w konsoli"
			})
		}
	}, [firebase, flashMessage, message, path])

	return deleteDocument
}

export default useDeleteDocument
