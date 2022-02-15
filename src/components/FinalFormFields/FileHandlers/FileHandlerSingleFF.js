import { css } from "styled-components/macro"

import { FileHandlerSingle } from "../../FileHandler"
import { SimpleFFWrapper } from "../HelperComponents"
import { useFieldWithError } from "../Helpers"

export const FileHandlerSingleFF = ({ label, ...rest }) => {
  return (
    <SimpleFFWrapper label={label}>
      <FileHandlerSingleFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

export const FileHandlerSingleFFUnwrapped = ({ name, info }) => {
  const { input, error } = useFieldWithError(name)

  return (
    <FileHandlerSingle
      {...input}
      error={error}
      info={info}
      containerStyles={css`
        width: 280px;
        height: 280px;
        margin: 0 auto;
      `}
    />
  )
}
