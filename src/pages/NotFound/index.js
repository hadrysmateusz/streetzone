import React from "react"
import { ROUTES } from "../../constants"
import { PageContainer, MainPageContainer } from "../../components/Containers"

const NotFound = () => {
	return (
		<MainPageContainer>
			<PageContainer>
				<h1>404</h1>
				<div>Strona której szukasz nie została znaleziona</div>
				<p>
					<a className="link" href={ROUTES.HOME}>
						Wróć do strony głównej
					</a>
				</p>
			</PageContainer>
		</MainPageContainer>
	)
}

export default NotFound
