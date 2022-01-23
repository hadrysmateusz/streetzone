import ManagementTemplate from "../ManagementTemplate"

import DesignerPreview from "./Preview"
import RequestedDesigners from "./RequestedDesigners"

const DesignersManagement = () => (
  <ManagementTemplate
    firestoreCollection="designers"
    addRouteName="ADMIN_DESIGNER_ADD"
    addRouteText="Dodaj Projektanta"
    heading="Projektanci"
    PreviewComponent={DesignerPreview}
  >
    <RequestedDesigners />
  </ManagementTemplate>
)

export default DesignersManagement
