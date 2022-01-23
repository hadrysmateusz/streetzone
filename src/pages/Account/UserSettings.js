import LoginManagement from "../../components/UserSettings/LoginManagement"
import EditProfile from "../../components/UserSettings/EditProfile"
import ChangeEmail from "../../components/UserSettings/ChangeEmail"
import DeleteAccount from "../../components/UserSettings/DeleteAccount"
import { SignOutButton } from "../../components/SignOut"
import { PageContainer } from "../../components/Containers"
import { Separator } from "../../components/Basics"

import { UserSettingsContainer, Section } from "./Common.styles"

const UserSettings = () => (
  <PageContainer>
    <UserSettingsContainer>
      <Section>
        <EditProfile />
      </Section>

      <Separator />

      <Section>
        <ChangeEmail />
      </Section>

      <Separator />

      <LoginManagement />

      <Separator />

      <Section>
        <SignOutButton />
      </Section>

      <Section>
        <DeleteAccount />
      </Section>
    </UserSettingsContainer>
  </PageContainer>
)

export default UserSettings
