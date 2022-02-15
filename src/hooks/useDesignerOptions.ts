import { useState, useEffect, useCallback } from "react"

import { makeReactSelectOption } from "../utils"

import useFirebase from "./useFirebase"
import { SelectOption } from "../components/FormElements/Dropdown"

export const useDesignerOptions = () => {
  const firebase = useFirebase()
  const [options, setOptions] = useState<SelectOption<string>[]>([])

  const getDesignerOptionsArr = useCallback(async () => {
    const snap = await firebase.designers().get()
    let optionsArr: SelectOption<string>[] = []
    snap.forEach((designer) => {
      const designerName = designer.data().label
      const designerOption = makeReactSelectOption(designerName)
      optionsArr.push(designerOption)
    })
    return optionsArr
  }, [firebase])

  useEffect(() => {
    getDesignerOptionsArr().then((optionsArr) => {
      setOptions(optionsArr)
    })
  }, [getDesignerOptionsArr])

  return options
}

export default useDesignerOptions
