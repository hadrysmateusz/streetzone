import React from "react"
import styled from "styled-components"

const PATH = process.env.PUBLIC_URL + "/img/empty_states/"

const imageSize = 100

const Image = styled.img`
	display: block;
	border-radius: 50%;
	height: ${imageSize}px;
	margin: 0;
`

const Container = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: flex-start;
`

const EmptyState = ({ text, state, children, src }) => {
	return children ? (
		<Container>
			<Image src={PATH + src} alt="" />
			{children}
		</Container>
	) : state ? (
		<Container>
			<Image src={state.image} alt="" />
			<p>{state.text}</p>
		</Container>
	) : (
		<div>{text}</div>
	)
}

export default EmptyState

export const UserNoItems = {
	text: "Ten użytkownik nie ma aktualnie żadnych przedmiotów na sprzedaż",
	image: PATH + "SadFace.png"
}

export const UserNoFeedback = {
	text: "Ten użytkownik nie ma jeszcze żadnych opinii",
	image: PATH + "SadFace.png"
}

export const UserNoFollowing = {
	text: "Nie obserwujesz jeszcze nikogo",
	image: PATH + "SadFace.png"
}

export const UserNoLiked = {
	text: "Nie zapisałeś jeszcze żadnego przedmiotu",
	image: PATH + "SadFace.png"
}

export const UserNoSoldItems = {
	text: "Ten użytkownik nie sprzedał jeszcze żadnego przedmiotu",
	image: PATH + "SadFace.png"
}

export const NoMoreItems = {
	text: "To już wszystko",
	image: PATH + "SadFace.png"
}

export const Generic = {
	text: "Coś poszło nie tak",
	image: PATH + "SadFace.png"
}

export const QueryNoResults = {
	text: "Brak wyników",
	image: PATH + "SadFace.png"
}
