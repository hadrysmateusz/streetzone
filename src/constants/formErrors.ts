import filesize from "filesize"
import CONST from "./const"

const {
  ATTACHMENTS_MAX_COUNT,
  ATTACHMENTS_MAX_SIZE,
  DESC_MAX_CHARACTERS,
  ACCOUNT_DESC_MAX_CHARACTERS,
  COMMENT_MAX_CHARACTERS,
  MIN_PASSWORD_LENGTH,
} = CONST

const formattedMaxFileSize = filesize(ATTACHMENTS_MAX_SIZE, { round: 0 })

export const FORM_ERR = {
  IS_REQUIRED: "To pole jest wymagane",
  EMAIL_INVALID: "Adres email jest niepoprawny",
  PASSWORDS_NOT_MATCHING: "Hasła nie zgadzają się",
  DESC_TOO_LONG: `Opis nie może być dłuższy niż ${DESC_MAX_CHARACTERS} znaków`,
  ACCOUNT_DESC_TOO_LONG: `Opis nie może być dłuższy niż ${ACCOUNT_DESC_MAX_CHARACTERS} znaków`,
  COMMENT_TOO_LONG: `Komentarz nie może być dłuższy niż ${COMMENT_MAX_CHARACTERS} znaków`,
  TOO_MANY_FILES: `Maksymalna ilość zdjęć to ${ATTACHMENTS_MAX_COUNT}`,
  FILES_REQUIRED: "Wymagane jest conajmniej jedno zdjęcie",
  FILE_TOO_BIG: `Zdjęcia nie mogą być większe niż ${formattedMaxFileSize}`,
  PRICE_MAX_LOWER_THAN_MIN:
    "Cena maksymalna nie może być niższa niż cena minimalna.",
  NO_FILTERS_APPLIED: "Brak filtrów do zapisania",
  NO_NEGATIVE: "Wartość nie może być ujemna",
  PASSWORD_TOO_SHORT: `Hasło powinno zawierać przynajmniej  ${MIN_PASSWORD_LENGTH} znaków`,
} as const

export default FORM_ERR
