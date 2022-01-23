import AuthUserContext from "./context"

const withAuthentication = (C) => (props) =>
  (
    <AuthUserContext.Consumer>
      {(authUser) => <C {...props} authUser={authUser} />}
    </AuthUserContext.Consumer>
  )

export default withAuthentication
