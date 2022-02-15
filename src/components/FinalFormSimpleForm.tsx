import { Form, FormProps } from "react-final-form"
import React from "react"

type FinalFormSimpleFormProps = Omit<
  FormProps,
  "children" | "component" | "render"
>

export const FinalFormSimpleForm: React.FC<FinalFormSimpleFormProps> = ({
  children,
  component,
  render,
  onSubmit,
  ...props
}) => {
  return (
    <Form onSubmit={onSubmit} {...props}>
      {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
    </Form>
  )
}
