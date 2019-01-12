import React from "react"
import { compose } from "recompose"

import OtherAccountPage from "./OtherAccountPage"
import YourAccountPage from "./YourAccountPage"
import { withAuthentication } from "../UserSession"
import ErrorBoundary from "../ErrorBoundary"
import { PageContainer } from "../Containers"

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
