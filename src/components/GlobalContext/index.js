import React from "react"

export const GlobalContext = React.createContext()

export const withGlobalContext = (C) => (props) => (
	<GlobalContext.Consumer>
		{(globalContext) => <C {...props} globalContext={globalContext} />}
	</GlobalContext.Consumer>
)

export const withGlobalContextProvider = (Component) => {
	return class extends React.Component {
		state = { isLoginModalVisible: false, modalPage: null }

		openModal = (page) => {
			this.setState({ isLoginModalVisible: true, modalPage: page })
		}

		closeModal = () => {
			this.setState({ isLoginModalVisible: false, modalPage: null })
		}

		render() {
			return (
				<GlobalContext.Provider
					value={{
						openModal: this.openModal,
						closeModal: this.closeModal,
						...this.state
					}}
				>
					<Component {...this.props} />
				</GlobalContext.Provider>
			)
		}
	}
}
