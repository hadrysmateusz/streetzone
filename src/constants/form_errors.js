import filesize from "filesize"
import { ATTACHMENTS_MAX_COUNT, ATTACHMENTS_MAX_SIZE } from "./const"

const formattedMaxFileSize = filesize(ATTACHMENTS_MAX_SIZE, { round: 0 })

export const IS_REQUIRED = "To pole jest wymagane"
export const EMAIL_INVALID = "Adres email jest niepoprawny"
export const PASSWORDS_NOT_MATCHING = "Hasła nie zgadzają się"
export const DESC_TOO_LONG = "Opis nie może być dłuższy niż 2000 znaków"
export const TOO_MANY_FILES = `Maksymalna ilość zdjęć to ${ATTACHMENTS_MAX_COUNT}`
export const FILES_REQUIRED = "Wymagane jest conajmniej jedno zdjęcie"
export const FILE_TOO_BIG = `Zdjęcia nie mogą być większe niż ${formattedMaxFileSize}`
export const PRICE_MAX_LOWER_THAN_MIN =
	"Cena maksymalna nie może być niższa niż cena minimalna."
