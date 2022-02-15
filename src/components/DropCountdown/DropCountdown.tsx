import { useState, useEffect, useMemo } from "react"

import { useAuthentication } from "../../hooks"

import { SaveIconButton } from "../SaveButton"

import { CountdownContainer } from "./DropCountdown.styles"
import { formatValue } from "./helpers"

const DropCountdown: React.FC<{ dropsAt: string; id: string }> = ({
  dropsAt,
  id,
}) => {
  const authUser = useAuthentication()
  const [value, setValue] = useState(() => formatValue(dropsAt))

  const isAuthenticated = !!authUser

  const isSaved = useMemo(
    () =>
      isAuthenticated &&
      authUser.followedDrops &&
      authUser.followedDrops.includes(id),
    [authUser?.followedDrops, id, isAuthenticated]
  )

  useEffect(() => {
    // update every minute
    const id = setInterval(() => {
      setValue(formatValue(dropsAt))
    }, 60000)

    return () => clearInterval(id)
  }, [dropsAt])

  return (
    <CountdownContainer isArchival={!value}>
      <div className="value-container">{value ?? "Archiwum"}</div>
      {value || isSaved ? (
        <SaveIconButton type="drop" id={id} scale={1.4} />
      ) : null}
    </CountdownContainer>
  )
}

export default DropCountdown
