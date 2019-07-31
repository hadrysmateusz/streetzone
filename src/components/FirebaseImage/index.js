// WIP

// import React from "react"
// import styled from "styled-components/macro"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// import LoadingSpinner from "../LoadingSpinner"
// import { getImageUrls } from "../utils/getImageUrl"

// export const FluidImage = styled.div`
// 	width: 100%;
// 	height: 100%;
// 	background-image: url("${(p) => p.url}");
// 	background-color: var(--almost-white);
// 	background-size: ${(p) => (p.contain ? "contain" : "cover")};
// 	background-repeat: no-repeat;
// 	background-position: center;
// `

// export const Image = styled.div`
// 	width: ${(p) => (p.width ? p.width : "100%")};
// 	height: 0;
// 	padding-bottom: 100%;
// 	background-image: url("${(p) => p.url}");
// 	background-color: var(--almost-white);
// 	background-size: cover;
// 	background-repeat: no-repeat;
// 	background-position: center;
// `

// export const ErrorIcon = styled(FontAwesomeIcon).attrs({ icon: "image" })`
// 	font-size: 5rem;
// 	path {
// 		color: ${(p) => p.theme.colors.gray[100]};
// 	}
// `

// const Container = styled.div`
// 	background: var(--almost-white);
// 	height: 100%;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	cursor: zoom-in;
// `

// export const imageLoader = (src) => {
// 	let img = new Image()
// 	const result = new Promise((resolve, reject) => {
// 		img.onload = resolve
// 		// eslint-disable-next-line no-multi-assign
// 		img.onabort = img.onerror = () => reject({})
// 		img.src = src
// 	})
// 	result.cancel = () => {
// 		if (!img) throw new Error("Already canceled")
// 		// eslint-disable-next-line no-multi-assign
// 		img.onload = img.onabort = img.onerror = undefined
// 		img.src = ""
// 		img = undefined
// 	}
// 	return result
// }

// const FirebaseImage = ({ storageRef, onClick }) => {
// 	const urls = getImageUrls(storageRef)

// 	return (
// 		<Container>
// 			{error ? (
// 				<ErrorIcon />
// 			) : isLoading ? (
// 				<LoadingSpinner />
// 			) : (
// 				<FluidImage url={imageURL} contain />
// 			)}
// 		</Container>
// 	)
// }

// export default FirebaseImage
