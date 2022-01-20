import React from "react"

import LoadingSpinner from "../../components/LoadingSpinner"
import { ButtonContainer, LinkButton } from "../../components/Button"
import { TextBlock } from "../../components/StyledComponents"
import { PageContainer } from "../../components/Containers"

import { useLiveCollection } from "../../hooks"
import { route } from "../../utils"

import { List } from "./Common"

const ManagementTemplate = ({
  firestoreCollection,
  addRouteName,
  addRouteText,
  heading,
  PreviewComponent,
  children,
}) => {
  const { results, isEmpty, isLoading } = useLiveCollection(firestoreCollection)

  console.log("ManagementTemplate", results)

  return isLoading ? (
    <LoadingSpinner fixedHeight />
  ) : (
    <PageContainer>
      <TextBlock size="xl" bold>
        {heading}
      </TextBlock>

      <div>{children}</div>

      <ButtonContainer>
        <LinkButton primary big fullWidth to={route(addRouteName)}>
          {addRouteText}
        </LinkButton>
      </ButtonContainer>

      <List>
        {!isEmpty && results.map((hit, i) => <PreviewComponent key={hit.id ?? i} {...hit} />)}
      </List>
    </PageContainer>
  )
}

export default ManagementTemplate
