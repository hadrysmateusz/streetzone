// import React from "react"
// import moment from "moment"
// import styled from "styled-components/macro"

// import Button, { ButtonContainer } from "../../../components/Button"

// import { useDeleteDocument, useLiveCollection } from "../../../hooks"
// import LoadingSpinner from "../../../components/LoadingSpinner"

// const DesignerRequest = styled.div`
//   background: white;
//   border: 1px solid var(--gray75);
//   padding: var(--spacing3);
//   margin-bottom: var(--spacing2);

//   h3 {
//     margin: 0;
//   }
// `

// const OuterContainer = styled.div`
//   margin: var(--spacing4) 0;
//   h2 {
//     margin: 0;
//   }
// `

// const ReportCard = ({}) => {
//   const deleteDocument = useDeleteDocument(`reportedOpinions/${id}`)

//   return (
//     <DesignerRequest>
//       <h3>{request.name}</h3>
//       <div>Requested At: {moment(request.requestedAt).format("LL")}</div>
//       <ButtonContainer>
//         <Button danger onClick={deleteDocument}>
//           Usuń
//         </Button>
//       </ButtonContainer>
//     </DesignerRequest>
//   )
// }

// const RequestedDesigners = () => {
//   const { reportedOpinions, isEmpty, isLoading } = useLiveCollection("reportedOpinions")

//   return (
//     <OuterContainer>
//       <h2>Zgłoszone opinie</h2>
//       {isEmpty ? (
//         <div>Brak</div>
//       ) : isLoading ? (
//         <LoadingSpinner />
//       ) : (
//         reportedOpinions.map((report) => <ReportCard {...report} />)
//       )}
//     </OuterContainer>
//   )
// }

// export default RequestedDesigners

export {}
