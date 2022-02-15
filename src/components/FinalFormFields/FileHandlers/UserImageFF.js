import { css } from "styled-components/macro"

import { FileHandlerSingle } from "../../FileHandler"

import { SimpleFFWrapper } from "../HelperComponents"
import { useFieldWithError } from "../Helpers"

export const UserImageFF = ({ label, ...rest }) => {
  return (
    <SimpleFFWrapper label={label}>
      <UserImageFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

export const UserImageFFUnwrapped = ({ name, info }) => {
  const { input, error } = useFieldWithError(name)

  return (
    <FileHandlerSingle
      {...input}
      error={error}
      info={info}
      containerStyles={css`
        width: 220px;
        height: 220px;
        border-radius: 50%;
        margin: 0 auto;
      `}
    />
  )
}
