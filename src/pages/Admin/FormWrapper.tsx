// import { Config } from "final-form"
// import { Form } from "react-final-form"

import { PageContainer } from "../../components/Containers"
import { LoadingSpinner } from "../../components/LoadingSpinner"

export const FormWrapper: React.FC<
  | {
      // onSubmit: Config["onSubmit"]
      initialValues: any
      edit: true
    }
  | {
      // onSubmit: Config["onSubmit"]
      initialValues?: undefined
      edit: false
    }
> = ({ initialValues, edit, children }) => {
  const isLoading = edit && !initialValues
  return <PageContainer>{isLoading ? <LoadingSpinner /> : children}</PageContainer>
}
