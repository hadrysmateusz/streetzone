import React, { createContext } from "react"

import Firebase from "./firebase"

const FirebaseContext = createContext<Firebase | null>(null)

const withFirebase = (Component: React.ComponentType<any>) => (props: any) =>
  (
    <FirebaseContext.Consumer>
      {(firebase) => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  )

export default withFirebase
export { FirebaseContext }
