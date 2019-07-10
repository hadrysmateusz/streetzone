import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { StatefulModal } from "../../../components/Modal/new"

import { ellipsis } from "../../../style-utils"

const ModalOuterContainer = styled.div`
	max-width: 100vw;
	min-height: 520px;
	width: 490px;
	overflow: hidden;
`

const Header = styled.div`
	padding: var(--spacing2) var(--spacing3);
	font-size: var(--fs-s);
	font-weight: var(--semi-bold);
	color: white;
	background: var(--black0);

	display: flex;
	align-items: center;
	justify-content: space-between;
`

const IconContainer = styled.div`
	height: 100%;
	cursor: pointer;
`

const List = styled.div`
	padding: 0 var(--spacing3);
	overflow-y: auto;
`

const ListItem = styled.div`
	padding: var(--spacing3) 0;
	:not(:last-child) {
		border-bottom: 1px solid var(--gray75);
	}
`

const StyledLink = styled.a`
	display: block;
	${ellipsis}
`

const GoToButton = styled.a`
	display: block;
	font-weight: var(--semi-bold);
	text-decoration: underline;
	> span {
		margin-right: 4px;
	}
`

const WhereToBuyModal = ({ children, links = [] }) => {
	return (
		<StatefulModal>
			{({ open, close, isOpen, modal }) => (
				<>
					{children({ open, close, isOpen, modal })}
					{modal(
						<ModalOuterContainer>
							<Header>
								<div>Gdzie kupić</div>
								<IconContainer onClick={close}>
									<FontAwesomeIcon icon="times" />
								</IconContainer>
							</Header>
							<List>
								{links.map((link) => (
									<ListItem>
										<StyledLink href={link}>{link}</StyledLink>
										<GoToButton href={link}>
											<span>Przejdź do strony</span>
											<FontAwesomeIcon icon="external-link-alt" />
										</GoToButton>
									</ListItem>
								))}
							</List>
						</ModalOuterContainer>
					)}
				</>
			)}
		</StatefulModal>
	)
}

export default WhereToBuyModal
