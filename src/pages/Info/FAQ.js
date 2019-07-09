import React from "react"
import styled from "styled-components/macro"
import ReactMarkdown from "react-markdown"

import topics from "./faqContent"

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
