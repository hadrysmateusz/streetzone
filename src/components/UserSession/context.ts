import React from "react"
import { MergedUser } from "../../types"

const AuthUserContext = React.createContext<MergedUser | null>(null)

export default AuthUserContext
