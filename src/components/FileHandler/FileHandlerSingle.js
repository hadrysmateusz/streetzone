import { useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import PropTypes from "prop-types"

import { CustomFile } from "."
import { IconContainer, Overlay } from "./Common.styles"
import { FormElementContainer } from "../FormElements"
import { TextBlock } from "../StyledComponents"
import { FileHandlerSingleContainer } from "./FileHandlerSingle.styles"

const FileHandlerSingle = ({
  info,
  error,
  disabled,
  value,
  onChange,
  containerStyles,
  variant,
  ...rest
}) => {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      // Create CustomFile with preview
      const file = acceptedFiles[0]
      let previewUrl = window.URL.createObjectURL(file)
      let customFile = new CustomFile({ previewUrl, data: file })

      // Reset the file input to prevent bugs
      inputRef.current.value = null

      // Update the state container
      onChange(customFile)
    },
    [inputRef, onChange]
  )

  const onDropRejected = (...args) => {
    debugger
  }

  useEffect(
    () => () => {
      // Revoke the data url to avoid memory leaks
      URL.revokeObjectURL(value.previewUrl)
    },
    [value]
  )

  const onClear = () => {
    onChange(null)
  }

  const isEmpty = !value || value.length === 0

  const { getRootProps, getInputProps, isDragActive, inputRef, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: "image/jpeg,image/png",
    noClick: true,
    multiple: false,
  })

  return (
    <FormElementContainer error={error} info={info} {...rest}>
      <FileHandlerSingleContainer
        {...getRootProps({ hasError: !!error, isEmpty, containerStyles })}
        variant={variant}
      >
        <input {...getInputProps()} />

        {!isEmpty && <img src={value.previewUrl} alt="" />}
        {isDragActive ? (
          <Overlay alwaysShow>Upuść tutaj by dodać</Overlay>
        ) : (
          <Overlay alwaysShow>
            <IconContainer onClick={open}>
              <FontAwesomeIcon icon="plus" size="2x" fixedWidth />
              <TextBlock centered>{!isEmpty ? "Zmień" : "Dodaj"}</TextBlock>
            </IconContainer>
            {!isEmpty && (
              <IconContainer onClick={onClear}>
                <FontAwesomeIcon icon="trash" size="2x" fixedWidth />
                <TextBlock centered>Usuń</TextBlock>
              </IconContainer>
            )}
          </Overlay>
        )}
      </FileHandlerSingleContainer>
    </FormElementContainer>
  )
}

// FileHandlerSingle.propTypes = {
//   info: PropTypes.string,
//   error: PropTypes.string,
//   disabled: PropTypes.bool,
//   value: PropTypes.object.isRequired,
//   onChange: PropTypes.func.isRequired,
//   containerStyles: PropTypes.any,
// }

export default FileHandlerSingle
