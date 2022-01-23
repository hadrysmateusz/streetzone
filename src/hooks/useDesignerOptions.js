import { useState, useEffect } from "react"

import { makeReactSelectOption } from "../utils"

import useFirebase from "./useFirebase"

export const useDesignerOptions = () => {
  const firebase = useFirebase()
  const [options, setOptions] = useState([])

  useEffect(() => {
    const getDesigners = async () => {
      const snap = await firebase.designers().get()
      let designersArr = []
      snap.forEach((designer) => {
        const designerName = designer.data().label
        const designerOption = makeReactSelectOption(designerName)
        designersArr.push(designerOption)
      })
      setOptions(designersArr)
    }

    getDesigners()
  }, [firebase])

  return options
}

export default useDesignerOptions
