import { Link } from "react-router-dom"

import ProfilePicture from "../../components/ProfilePicture"

import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useUserData } from "../../hooks"
import { route } from "../../utils"

import { EmptyRoomTab, RoomTabStyles } from "./StyledComponents"

const RoomTab = ({ id, otherUserId }) => {
  const [user, error] = useUserData(otherUserId)

  return (
    <RoomTabStyles>
      <Link to={route("CHAT_ROOM", { roomId: id })}>
        {!error && user ? (
          <>
            <ProfilePicture
              size="30px"
              url={getProfilePictureURL(user, "S")}
              inline
            />
            <span className="name">{user.name}</span>
          </>
        ) : (
          <EmptyRoomTab>Konto usunięte</EmptyRoomTab>
        )}
      </Link>
    </RoomTabStyles>
  )
}

export const ChatRoomsList = ({ rooms }) =>
  rooms.map((room) => <RoomTab key={room.id} {...room} />)
