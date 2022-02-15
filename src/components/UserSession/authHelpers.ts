import { MergedUser } from "../../types"

export function isAuthenticated(
  authUser: MergedUser | null
): authUser is MergedUser {
  return !!authUser
}

// TODO: create union type for all available roles
export function hasRole(authUser: MergedUser | null, role: string) {
  if (!isAuthenticated(authUser)) {
    return false
  }

  if (!authUser.roles || !Array.isArray(authUser.roles)) {
    console.error("authUser object has missing or incorrect roles array")
    return false
  }

  return authUser.roles.includes(role)
}

export function isAdmin(authUser: MergedUser | null) {
  return hasRole(authUser, "admin")
}
