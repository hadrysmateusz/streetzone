import { ImageContainer, PlaceholderIcon, ProfilePictureContainer } from "./ProfilePicture.styles"

const ProfilePicture = ({ url, size = "100%", inline, ...rest }) => (
  <ProfilePictureContainer size={size} inline={inline} {...rest}>
    <ImageContainer url={url} />
    <PlaceholderIcon icon="user-circle" style={{ width: size }} />
  </ProfilePictureContainer>
)

export default ProfilePicture
