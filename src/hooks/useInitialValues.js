import { useEffect, useState } from "react"

import { getImageUrl } from "../utils/getImageUrl"
import { CustomFile } from "../components/FileHandler"

import { useFirebase } from "./useFirebase"

// default transform function simply returns data unmodified
const defaultTransformFunction = (data) => data

const defaultImagesConfig = []

/**
 * Fetches and prepares data for an edit form, it's important for the config to be the same array every time to prevent an endless loop
 * @param {string} path path of document to fetch
 * @param {array} imagesConfig
 * @param {function} transform function transforming fetched data to work with the form
 */
const useInitialValues = (
  path,
  imagesConfig = defaultImagesConfig,
  transform = defaultTransformFunction
) => {
  const firebase = useFirebase()
  const [initialValues, setInitialValues] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const snap = await firebase.db.doc(path).get()

      let data = snap.data()

      imagesConfig.forEach(({ key, name }) => {
        // look for key specified in config
        let value = data[key]

        if (Array.isArray(value)) {
          // if value is array, process all of its elements
          data[name] = value.map(
            (ref) =>
              new CustomFile({
                storageRef: ref,
                previewUrl: getImageUrl(ref, "M"),
                isUploaded: true,
              })
          )
        } else {
          // otherwise process the single element
          data[name] = new CustomFile({
            storageRef: value,
            previewUrl: getImageUrl(value, "M"),
            isUploaded: true,
          })
        }
      })

      data = transform(data)

      setInitialValues(data)
    }
    getData()
  }, [firebase.db, imagesConfig, path, transform])

  return initialValues
}

export default useInitialValues
