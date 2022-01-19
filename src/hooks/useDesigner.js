import useFirebase from "./useFirebase"
import { useState, useEffect } from "react"

export const useDesigner = (selectedDesigner) => {
  const [designer, setDesigner] = useState(null)
  const firebase = useFirebase()

  useEffect(() => {
    const getDesigner = async () => {
      const snap = await firebase.designers().where("label", "==", selectedDesigner).get()

      let designersArr = []
      snap.forEach((a) => {
        designersArr.push(a.data())
      })

      setDesigner(designersArr[0])
    }

    getDesigner()
  }, [firebase, selectedDesigner])

  return designer
}

export default useDesigner
