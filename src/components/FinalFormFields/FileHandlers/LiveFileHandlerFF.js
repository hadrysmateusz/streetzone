import { LiveFileHandler } from "../../FileHandler"
import { SimpleFFWrapper } from "../HelperComponents"
import { useFieldWithError } from "../Helpers"

export const LiveFileHandlerFF = ({ label, ...rest }) => {
  return (
    <SimpleFFWrapper label={label}>
      <LiveFileHandlerFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

export const LiveFileHandlerFFUnwrapped = ({ name, uploadPath, info }) => {
  const { input, error } = useFieldWithError(name)

  return (
    <LiveFileHandler
      {...input}
      uploadPath={uploadPath}
      error={error}
      info={info}
    />
  )
}
