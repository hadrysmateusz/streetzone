import React, { useState, useEffect } from "react"
import { ROUTES } from "../../constants"
import { StyledLink } from "../../components/Basics"
import useFirebase from "../../hooks/useFirebase"
import LoadingSpinner from "../../components/LoadingSpinner"
import { encodeURL } from "../../utils/algoliaURLutils"

const useDesigners = () => {
	const firebase = useFirebase()
	const [designers, setDesigners] = useState(null)

	const getDesigners = async () => {
		const snap = await firebase.designers().get()
		let designersArr = []
		snap.forEach((designer) => {
			console.log(designer, designer.data())
			designersArr.push(designer.data())
		})
		setDesigners(designersArr)
	}

	useEffect(() => {
		getDesigners()
	}, [])

	return designers
}

const DesignerLink = ({ value }) => {
	return (
		<StyledLink to={encodeURL({ designers: [value] }, ROUTES.MARKETPLACE)}>
			{value}
		</StyledLink>
	)
}

const DesignersPage = () => {
	const designers = useDesigners()

	return (
		<div>
			{designers ? (
				designers.map((designer) => <DesignerLink value={designer.label} />)
			) : (
				<LoadingSpinner fixedHeight />
			)}
		</div>
	)
}

export default DesignersPage
