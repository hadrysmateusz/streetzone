import React from "react"
import styled from "styled-components/macro"
import ReactMarkdown from "react-markdown"

import { CONST } from "../../constants"
import { route } from "../../utils"

const Container = styled.div``

const Group = styled.section`
	margin-bottom: var(--spacing4);
`

const Question = styled.h2`
	font-size: var(--fs-m);
	font-weight: bold;
	margin: 0 0 var(--spacing2) 0;
`

const Answer = styled.p`
	font-size: var(--fs-s);
	margin: 0;
	a {
		text-decoration: underline;
		color: black;
		font-weight: var(--semi-bold);
	}
`

const enableNotificationsLink = route("ALLOW_NOTIFICATIONS")
const promotingInfoLink = route("PROMOTING_INFO")
const bugReportLink = route("BUG_REPORT")
const requestDesignerLink = route("REQUEST_DESIGNER")
const messengerLinkHelpLink =
	"https://www.facebook.com/help/messenger-app/1047811435279151?helpref=uf_permalink"

const topics = [
	{
		question: "Jak skontaktować się ze sprzedawcą?",
		answer: `Kliknij 'Kontakt' na stronie ogłoszenia i wybierz jedną z opcji udostępnionych przez tego użytkownika. Dla wszystkich użytkowników dostępny jest nasz komunikator, reszta jest opcjonalna i zależy od sprzedawcy.`
	},
	{
		question: "Projektant którego potrzebuje nie jest na waszej liście",
		answer: `Jeśli nie znalazłeś marki której potrzebujesz, by dodać przedmiot napisz do nas na [${
			CONST.CONTACT_EMAIL
		}](mailto:${
			CONST.CONTACT_EMAIL
		}) lub użyj formularza dostępnego [tutaj](${requestDesignerLink}).`
	},
	{
		question: "Co daje mi system promowania?",
		answer: `Wszelkie informacje na temat benefitów płynących z systemu promowania możesz znaleźć w tej zakładce: [Promowanie i odświeżanie](${promotingInfoLink})`
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
		answer: `Jeśli znalazłeś jakiś problem, napisz do nas [tutaj](${bugReportLink}). Postaramy się jak najszybciej go naprawić.`
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
		answer: `Upewnij się że powiadomienia są włączone dla tej strony, postępując zgodnie z instrukcjami dostępnymi [w tym linku](${enableNotificationsLink}). Powiadomienia nie są aktualnie dostępne dla użytkowników Safari.`
	}
]

const FAQPage = () => {
	return (
		<Container>
			{topics.map((topic) => (
				<Group>
					<Question>{topic.question}</Question>
					<Answer>
						<ReactMarkdown
							source={topic.answer.replace(/\\n/g, "\n")}
							escapeHtml={false}
						/>
					</Answer>
				</Group>
			))}
		</Container>
	)
}

export default FAQPage
