import React, { Component } from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"
import Clear, { ClearRange } from "../Algolia/ClearCategoryButton"
import { TextBlock } from "../StyledComponents"
import { Flex } from "rebass"

const Header = styled.header`
	padding: ${(p) => (p.noMargin ? "0" : "var(--spacing3)")};
	cursor: pointer;
	user-select: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	svg {
		transition: transform 0.32s ease;
		${(p) => p.isFolded && "transform: rotate(-180deg);"}
	}
`

const Content = styled.div`
	padding: 0 var(--spacing3) var(--spacing3);
`

export const AdaptiveFoldable = withBreakpoints(
	class extends Component {
		state = { isFolded: false }
		changeBreakpoint = 3

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
			const {
				children,
				currentBreakpoint,
				openTab,
				tab,
				attribute,
				showClear,
				resetState
			} = this.props

			// Based on current breakpoint choose between local or provided value
			const isFolded =
				+currentBreakpoint < +this.changeBreakpoint
					? openTab.id !== tab.id
					: this.state.isFolded
			// Based on current breakpoint choose between local or provided function
			const toggleFunction =
				+currentBreakpoint < +this.changeBreakpoint
					? () => this.props.toggle(tab.id)
					: this.toggle

			return (
				<section>
					<Header onClick={toggleFunction} isFolded={isFolded}>
						<Flex>
							<TextBlock bold uppercase>
								{tab.displayName}
							</TextBlock>
							{showClear &&
								(tab.id === "price" ? (
									<ClearRange attribute={attribute} resetState={resetState} />
								) : (
									<Clear attribute={attribute} />
								))}
						</Flex>
						<FontAwesomeIcon icon={"caret-up"} />
					</Header>
					<Content hidden={isFolded}>{children}</Content>
				</section>
			)
		}
	}
)

class Foldable extends Component {
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
				<Header onClick={this.toggle} isFolded={this.state.isFolded} noMargin>
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
