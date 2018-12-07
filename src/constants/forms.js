import filesize from "filesize"
import * as CONST from "./const"

export const ERR_IS_REQUIRED = "To pole jest wymagane"
export const ERR_EMAIL_INVALID = "Adres email jest niepoprawny"
export const ERR_PASSWORDS_NOT_MATCHING = "Hasła nie zgadzają się"
export const ERR_DESC_TOO_LONG = "Opis nie może być dłuższy niż 2000 znaków"
export const ERR_TOO_MANY_FILES = `Maksymalna ilość zdjęć to ${
	CONST.ATTACHMENTS_MAX_COUNT
}`
export const ERR_FILES_REQUIRED = "Wymagane jest conajmniej jedno zdjęcie"
export const ERR_FILE_TOO_BIG = `Zdjęcia nie mogą być większe niż ${filesize(
	CONST.ATTACHMENTS_MAX_SIZE,
	{ round: 0 }
)}`
