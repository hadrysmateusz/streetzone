import filesize from "filesize"
import {
	ATTACHMENTS_MAX_COUNT,
	ATTACHMENTS_MAX_SIZE,
	DESC_MAX_CHARACTERS,
	ACCOUNT_DESC_MAX_CHARACTERS,
	COMMENT_MAX_CHARACTERS,
	MIN_PASSWORD_LENGTH
} from "./const"

const formattedMaxFileSize = filesize(ATTACHMENTS_MAX_SIZE, { round: 0 })

export const IS_REQUIRED = "To pole jest wymagane"
export const EMAIL_INVALID = "Adres email jest niepoprawny"
export const PASSWORDS_NOT_MATCHING = "Hasła nie zgadzają się"
export const DESC_TOO_LONG = `Opis nie może być dłuższy niż ${DESC_MAX_CHARACTERS} znaków`
export const ACCOUNT_DESC_TOO_LONG = `Opis nie może być dłuższy niż ${ACCOUNT_DESC_MAX_CHARACTERS} znaków`
export const COMMENT_TOO_LONG = `Komentarz nie może być dłuższy niż ${COMMENT_MAX_CHARACTERS} znaków`
export const TOO_MANY_FILES = `Maksymalna ilość zdjęć to ${ATTACHMENTS_MAX_COUNT}`
export const FILES_REQUIRED = "Wymagane jest conajmniej jedno zdjęcie"
export const FILE_TOO_BIG = `Zdjęcia nie mogą być większe niż ${formattedMaxFileSize}`
export const PRICE_MAX_LOWER_THAN_MIN =
	"Cena maksymalna nie może być niższa niż cena minimalna."
export const NO_FILTERS_APPLIED = "Brak filtrów do zapisania"
export const NO_NEGATIVE = "Wartość nie może być ujemna"
export const PASSWORD_TOO_SHORT = `Hasło powinno zawierać przynajmniej  ${MIN_PASSWORD_LENGTH} znaków`
