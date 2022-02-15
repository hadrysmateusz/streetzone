import { useEffect, useMemo, useState } from "react"

import { makeReactSelectOption } from "../utils"

import useFirebase from "./useFirebase"

export type TagOptionValue = string

export type TagOption = {
  value: TagOptionValue
  label: string
}

export const useTagsOptions = () => {
  const firebase = useFirebase()
  const [options, setOptions] = useState<TagOption[]>([])

  useEffect(() => {
    // an unsubscribe function is returned
    return firebase.db.collection("tags").onSnapshot((snap) => {
      const optionsArr: TagOption[] = []
      snap.forEach((designer) => {
        const tagName = designer.data().name
        const tagOption = makeReactSelectOption(tagName)
        optionsArr.push(tagOption)
      })
      setOptions(optionsArr)
    })
  }, [firebase])

  const isEmpty = options && options.length === 0
  const isLoading = !options

  return useMemo(
    () => ({ options, isLoading, isEmpty }),
    [isEmpty, isLoading, options]
  )
}

export default useTagsOptions
