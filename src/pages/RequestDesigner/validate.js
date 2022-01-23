const validate = ({ name }) => {
  const errors = {}
  if (!name || !name.trim()) {
    errors.name = "Pole nie może być puste"
  }
  return errors
}

export default validate
