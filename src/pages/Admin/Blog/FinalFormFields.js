import React from "react"
import { Field } from "react-final-form"
import ReactMarkdown from "react-markdown"
import "react-datetime/css/react-datetime.css"

import { Input, Textarea } from "../../../components/FormElements"
import {
	LiveFileHandler,
	FileHandlerText,
	FileHandler
} from "../../../components/FileHandler"
import DropdownFinalform from "../../../components/DropdownFinalform"
import MultiTextInputFinalform from "../../../components/MultiTextInputFinalform"

import { Section, ContentEditorContainer, PreviewStyles } from "./StyledComponents"

export const TextFF = ({ label, name, placeholder, info }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return (
						<Input
							{...input}
							type="text"
							placeholder={placeholder}
							error={error}
							info={info}
						/>
					)
				}}
			</Field>
		</Section>
	)
}

export const NumberFF = ({ label, name, step, min, max, placeholder, info }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return (
						<Input
							{...input}
							type="number"
							placeholder={placeholder}
							error={error}
							step={step}
							min={min}
							max={max}
							info={info}
						/>
					)
				}}
			</Field>
		</Section>
	)
}

export const TextareaFF = ({ label, name, placeholder, info }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return (
						<Textarea {...input} placeholder={placeholder} error={error} info={info} />
					)
				}}
			</Field>
		</Section>
	)
}

export const MultiTextInputFF = ({ label, name, placeholder, info }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name} type="select">
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return (
						<MultiTextInputFinalform
							{...input}
							placeholder={placeholder}
							error={error}
							info={info}
						/>
					)
				}}
			</Field>
		</Section>
	)
}

export const DropdownFF = ({
	label,
	name,
	placeholder,
	options,
	isSearchable,
	isClearable,
	isMulti,
	info
}) => {
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
							isSearchable={isSearchable}
							isClearable={isClearable}
							isMulti={isMulti}
							info={info}
						/>
					)
				}}
			</Field>
		</Section>
	)
}

export const FileHandlerFF = ({ label, name, info }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error.main : null
					const itemErrors = meta.error ? meta.error.specific : null
					return (
						<FileHandler {...input} error={error} itemErrors={itemErrors} info={info} />
					)
				}}
			</Field>
		</Section>
	)
}

export const LiveFileHandlerFF = ({ label, name, uploadPath, info }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return (
						<LiveFileHandler
							{...input}
							uploadPath={uploadPath}
							error={error}
							info={info}
						/>
					)
				}}
			</Field>
		</Section>
	)
}

export const MarkdownEditorFF = ({ label, name, info }) => {
	return (
		<Section>
			<div className="header">{label}</div>
			<Field name={name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					const { value } = input
					return (
						<ContentEditorContainer>
							<FileHandlerText {...input} error={error} info={info} />
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
