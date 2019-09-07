import React from "react"

import { useFinalFormFieldAdapter, withFormFieldWrapper } from "../FinalFormFields"

import { PostEditor } from "."

const PostEditorFormField = withFormFieldWrapper(PostEditor)

const FinalFormPostEditor = ({ contentName, attachmentsName, ...rest }) => {
	const attachmentsProps = useFinalFormFieldAdapter(attachmentsName)
	const contentProps = useFinalFormFieldAdapter(contentName)

	return (
		<PostEditorFormField
			value={contentProps.value}
			onChange={contentProps.onChange}
			onBlur={contentProps.onBlur}
			onFocus={contentProps.onFocus}
			attachmentsValue={attachmentsProps.value}
			onAttachmentsChange={attachmentsProps.onChange}
			{...rest}
		/>
	)
}

export default FinalFormPostEditor
