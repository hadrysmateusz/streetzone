import ManagementTemplate from "../ManagementTemplate"

import DropPreview from "./Preview"

const DropsManagement = () => (
  <ManagementTemplate
    firestoreCollection="drops"
    addRouteName="ADMIN_DROPS_ADD"
    addRouteText="Dodaj Dropa"
    heading="Dropy"
    PreviewComponent={DropPreview}
  />
)

export default DropsManagement
