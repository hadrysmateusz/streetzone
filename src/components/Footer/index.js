import React from "react"
import styled from "styled-components"
import { CONST, CSS } from "../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const OuterContainer = styled.div`
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid rgb(221, 221, 221);
	background: white;
	color: #292929;
	font-size: 1.03rem;
	/* box-shadow: 0 -3px 5px -1px rgba(0, 0, 0, 0.05); */
`

const IconContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: 100%;
	gap: 15px;
	& > * {
		&:hover {
			color: ${CSS.COLOR_ACCENT};
		}
	}
`

const Item = styled.div`
	:not(${IconContainer}) {
		:hover {
			color: ${CSS.COLOR_ACCENT};
			cursor: pointer;
		}
	}
`

const InnerContainer = styled.div`
	display: flex;
	& > div {
		padding: 0 15px;
	}
`

const Footer = () => {
	return (
		<OuterContainer>
			<InnerContainer>
				<Item>FAQ</Item>
				<Item>Polityka Prywatności</Item>
				<IconContainer>
					<Item>
						<FontAwesomeIcon icon={["fab", "twitter"]} />
					</Item>
					<Item>
						<FontAwesomeIcon icon={["fab", "facebook-square"]} />
					</Item>
					<Item>
						<FontAwesomeIcon icon={["fab", "instagram"]} />
					</Item>
				</IconContainer>
			</InnerContainer>

			<InnerContainer>
				<div>{CONST.BRAND_NAME} © 2019</div>
			</InnerContainer>
		</OuterContainer>
	)
}

export default Footer
