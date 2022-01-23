import { StyledSelect } from "./Dropdown.styles"
import FormElementContainer from "./FormElementContainer"

const Dropdown = ({
  placeholder = "Wybierz",
  noOptionsMessage = "Brak opcji",
  info,
  error,
  disabled,
  ...rest
}) => (
  <FormElementContainer info={info} error={error}>
    <StyledSelect
      hasError={!!error}
      isDisabled={disabled}
      placeholder={placeholder}
      // noOptionsMessage is a function that receives inputValue but I don't care about that
      noOptionsMessage={() => noOptionsMessage}
      {...rest}
    />
  </FormElementContainer>
)

export default Dropdown
