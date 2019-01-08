import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = styled.div`
	padding-bottom: 4px;
	margin-bottom: 10px;
	color: ${(p) => p.theme.colors.black[100]};
	text-transform: uppercase;
	font-size: 0.85rem;
	border-bottom: 1px solid ${(p) => p.theme.colors.black[100]};
	span {
		padding-right: 6px;
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
		console.log("toggling")
		const isFolded = !this.state.isFolded
		this.setState({ isFolded })
	}

	render() {
		return (
			<div>
				<Header onClick={this.toggle} style={{ cursor: "pointer" }}>
					<span>{this.props.title}</span>
					<FontAwesomeIcon icon={this.state.isFolded ? "caret-down" : "caret-up"} />
				</Header>
				{!this.state.isFolded && <div>{this.props.children}</div>}
			</div>
		)
	}
}

export default Foldable
