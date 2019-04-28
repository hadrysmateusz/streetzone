import React from "react"
import { Field } from "react-final-form"
import ReactMarkdown from "react-markdown"
import "react-datetime/css/react-datetime.css"

import { Input, Textarea } from "../../../components/FormElements"
import { LiveFileHandler, FileHandlerText } from "../../../components/FileHandler"
import DropdownFinalform from "../../../components/DropdownFinalform"
import MultiTextInputFinalform from "../../../components/MultiTextInputFinalform"

import { Section, ContentEditorContainer, PreviewStyles } from "./StyledComponents"

export const TextFF = ({ label, name, placeholder }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return <Input {...input} type="text" placeholder={placeholder} error={error} />
				}}
			</Field>
		</Section>
	)
}

export const DropdownFF = ({ label, name, placeholder, options }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name} type="select">
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return (
						<DropdownFinalform
							{...input}
							options={options}
							placeholder={placeholder}
							error={error}
						/>
					)
				}}
			</Field>
		</Section>
	)
}

export const LiveFileHandlerFF = ({ label, name, uploadPath }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return <LiveFileHandler {...input} uploadPath={uploadPath} error={error} />
				}}
			</Field>
		</Section>
	)
}

export const MarkdownEditorFF = ({ label, name }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					const { value } = input
					return (
						<ContentEditorContainer>
							<FileHandlerText {...input} error={error} />
							<PreviewStyles>
								<ReactMarkdown source={value} escapeHtml={false} />
							</PreviewStyles>
						</ContentEditorContainer>
					)
				}}
			</Field>
		</Section>
	)
}

export const TextareaFF = ({ label, name, placeholder }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return <Textarea {...input} placeholder={placeholder} error={error} />
				}}
			</Field>
		</Section>
	)
}

export const MultiTextInputFF = ({ label, name, placeholder }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name} type="select">
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return (
						<MultiTextInputFinalform {...input} placeholder={placeholder} error={error} />
					)
				}}
			</Field>
		</Section>
	)
}
