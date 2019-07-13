import { CONST } from "../../constants"
import { route } from "../../utils"

const messengerLinkHelpLink =
	"https://www.facebook.com/help/messenger-app/1047811435279151?helpref=uf_permalink"

const topics = [
	{
		question: "Jak skontaktować się ze sprzedawcą?",
		answer: `Kliknij 'Kontakt' na stronie ogłoszenia i wybierz jedną z opcji udostępnionych przez tego użytkownika. Dla wszystkich użytkowników dostępny jest nasz komunikator, reszta jest opcjonalna i zależy od sprzedawcy.`
	},
	{
		question: "Projektant którego potrzebuję nie jest na waszej liście",
		answer: `Jeśli nie znalazłeś marki której potrzebujesz, by dodać przedmiot napisz do nas na [${
			CONST.CONTACT_EMAIL
		}](mailto:${CONST.CONTACT_EMAIL}) lub użyj formularza dostępnego [tutaj](${route(
			"REQUEST_DESIGNER"
		)}).`
	},
	{
		question: "Co daje mi system promowania?",
		answer: `Wszelkie informacje na temat benefitów płynących z systemu promowania możesz znaleźć w tej zakładce: [Promowanie i odświeżanie](${route(
			"PROMOTING_INFO"
		)})`
	},
	{
		question: "Na czym polega odświeżanie / bumpowanie?",
		answer: `Odświeżenie przedmiotu sprawi że powróci on na górę wyników wyszukiwania, gdzie zobaczy go dużo więcej osób.`
	},
	{
		question: "Dlaczego moje ogłoszenie zostało usunięte?",
		answer: `Ogłoszenie mogło nie spełniać podstawowych wymagań regulaminu. Najczęstszą przyczyną jest brak tagu na zdjęciu.`
	},
	{
		question: "Gdzie znajdę zapisane ogłoszenia, dropy itd.?",
		answer: "Każdą zapisaną rzecz znajdziesz w odpowiedniej zakładce na swoim profilu."
	},
	{
		question: "Znalazłem problem na stronie",
		answer: `Jeśli znalazłeś jakiś problem, napisz do nas [tutaj](${route(
			"BUG_REPORT"
		)}). Postaramy się jak najszybciej go naprawić.`
	},
	{
		question: "Gdzie znaleźć link do mojego profilu na messenger?",
		answer: `Jest to bardzo proste, instrukcje znajdziesz [tutaj](${messengerLinkHelpLink})\\n\\nLink ma format: _m.me/nazwa.uzytkownika_`
	},
	{
		question: "Czy mogę edytować ogłoszenie po wystawieniu?",
		answer: `Jasne. Ogłoszenie możesz edytować z poziomu twojego profilu, lub na stronie tego ogłoszenia. Zmieniać można jedynie określone parametry.`
	},
	{
		question: "Nie pojawiają mi się powiadomienia",
		answer: `Upewnij się że powiadomienia są włączone dla tej strony, postępując zgodnie z instrukcjami dostępnymi [w tym linku](${route(
			"ALLOW_NOTIFICATIONS"
		)}). Powiadomienia nie są aktualnie dostępne dla użytkowników Safari.`
	}
]

export default topics
