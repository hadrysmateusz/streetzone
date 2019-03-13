import React from "react"
import { compose } from "recompose"

import { withAuthentication } from "../../components/UserSession"
import ErrorBoundary from "../../components/ErrorBoundary"
import { PageContainer } from "../../components/Containers"

import OtherAccountPage from "./OtherAccountPage"
import YourAccountPage from "./YourAccountPage"

const AccountPage = ({ authUser, match, ...rest }) => {
	return (
		<PageContainer>
			<ErrorBoundary>
				{authUser && authUser.uid === match.params.id ? (
					<YourAccountPage authUser={authUser} match={match} {...rest} />
				) : (
					<OtherAccountPage
						authUser={authUser}
						userId={match.params.id}
						match={match}
						{...rest}
					/>
				)}
			</ErrorBoundary>
		</PageContainer>
	)
}

export default compose(withAuthentication)(AccountPage)
