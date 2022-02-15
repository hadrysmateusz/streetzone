import React, { createContext } from "react"

import Firebase from "./firebase"

const FirebaseContext = createContext<Firebase | null>(null)

export { FirebaseContext }
