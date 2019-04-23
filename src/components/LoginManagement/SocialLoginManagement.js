import React from "react"
import InfoBox from "../InfoBox"
import { TextBlock } from "../StyledComponents"

import SocialLoginCard from "./SocialLoginCard"
import { SocialCardsContainer, SocialContainer } from "./StyledComponents"
import SIGN_IN_METHODS from "../../constants/signInMethods"

const SocialLoginManagement = ({ activeMethods, onlyOneLeft, onLink, onUnlink }) => {
	return (
		<SocialContainer>
			<TextBlock size="m" bold uppercase>
				Konta Społecznościowe
			</TextBlock>

			<InfoBox>
				Połącz swoje konto na Bumped z jednym lub więcej kontami społecznościowymi, by móc
				logować się za ich pomocą do serwisu.
			</InfoBox>

			<SocialCardsContainer>
				{SIGN_IN_METHODS.map((signInMethod) => {
					const isEnabled = activeMethods.includes(signInMethod.id)

					return signInMethod.id !== "password" ? (
						<SocialLoginCard
							key={signInMethod.id}
							isEnabled={isEnabled}
							onlyOneLeft={onlyOneLeft}
							signInMethod={signInMethod}
							onUnlink={onUnlink}
							onLink={onLink}
						/>
					) : null
				})}
			</SocialCardsContainer>
		</SocialContainer>
	)
}

export default SocialLoginManagement
