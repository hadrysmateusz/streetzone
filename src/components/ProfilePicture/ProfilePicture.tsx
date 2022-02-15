import {
  ImageContainer,
  PlaceholderIcon,
  ProfilePictureContainer,
} from "./ProfilePicture.styles"

const ProfilePicture: React.FC<{
  url: string
  size?: string
  inline?: boolean
}> = ({ url, size = "100%", inline = false, ...rest }) => (
  <ProfilePictureContainer size={size} inline={inline} {...rest}>
    <ImageContainer url={url} />
    <PlaceholderIcon icon="user-circle" style={{ width: size }} />
  </ProfilePictureContainer>
)

export default ProfilePicture
