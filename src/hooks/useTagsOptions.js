import { useState, useEffect } from "react"

import { makeReactSelectOption } from "../utils"

import useFirebase from "./useFirebase"

export const useTagsOptions = () => {
  const firebase = useFirebase()
  const [options, setOptions] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.db.collection("tags").onSnapshot((snap) => {
      let tagsArr = []
      snap.forEach((designer) => {
        const tagName = designer.data().name
        const tagOption = makeReactSelectOption(tagName)
        tagsArr.push(tagOption)
      })
      setOptions(tagsArr)
    })

    return unsubscribe
  }, [firebase])

  const isEmpty = options && options.length === 0
  const isLoading = !options

  return { options, isLoading, isEmpty }
}

export default useTagsOptions
