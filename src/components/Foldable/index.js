import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = styled.div`
	padding: 6px;
	color: ${(p) => p.theme.colors.black[0]};
	text-transform: uppercase;
	font-size: 0.85rem;
	font-weight: 600;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	svg {
		transition: transform 0.32s ease;
		${(p) => p.isFolded && "transform: rotate(-180deg);"}
	}
`

class Foldable extends React.Component {
	state = { isFolded: false }

	componentDidMount = () => {
		if (this.props.startFolded) {
			this.setState({ isFolded: true })
		}
	}

	toggle = () => {
		const isFolded = !this.state.isFolded
		this.setState({ isFolded })
	}

	render() {
		return (
			<div>
				<Header onClick={this.toggle} isFolded={this.state.isFolded}>
					<span>{this.props.title}</span>
					<FontAwesomeIcon icon={"caret-up"} />
				</Header>
				{this.props.onlyVisual ? (
					<div hidden={this.state.isFolded}>{this.props.children}</div>
				) : (
					!this.state.isFolded && <div>{this.props.children}</div>
				)}
			</div>
		)
	}
}

export default Foldable
