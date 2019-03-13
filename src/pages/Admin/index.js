import React, { Component } from "react"
import { compose } from "recompose"

import { withAuthorization, withAuthentication } from "../../components/UserSession"
import { withFirebase } from "../../components/Firebase"

import DesignersDb from "./DesignersDb"
import UsersManagement from "./UsersManagement"
import ItemsManagement from "./ItemsManagement"
import AddItems from "./AddItems"

export class AdminPage extends Component {
	render() {
		return (
			<div
				style={{ margin: "0 auto", width: "100%", maxWidth: "800px", padding: "10px" }}
			>
				<DesignersDb firebase={this.props.firebase} />
				<UsersManagement firebase={this.props.firebase} />
				<ItemsManagement firebase={this.props.firebase} />
				<AddItems firebase={this.props.firebase} />
			</div>
		)
	}
}

const condition = (authUser) => authUser && authUser.roles.includes("admin")

export default compose(
	withFirebase,
	withAuthentication,
	withAuthorization(condition)
)(AdminPage)
