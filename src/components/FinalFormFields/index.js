import React from "react"
import { Field, useField } from "react-final-form"
import styled, { css } from "styled-components/macro"
import StarRatings from "react-star-ratings"

import { Input, Textarea, FormElementContainer } from "../FormElements"
import { LiveFileHandler, FileHandler, FileHandlerSingle } from "../FileHandler"
import DropdownFinalform from "../DropdownFinalform"
import MultiTextInputFinalform from "../MultiTextInputFinalform"
import TagsInput from "../FormElements/TagsInput"

export const FieldLabel = styled.div`
	font-weight: bold;
`

export const Section = styled.div`
	${(p) => p.flex && `display: flex;`}

	.sub-section {
		flex: 1 1 50%;
		:not(:last-child) {
			margin-right: var(--spacing2);
		}
	}

	.header {
		font-weight: bold;
	}
`

export const TextFF = ({ label, name, placeholder, info, password = false }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<Input
						{...input}
						type={password ? "password" : "text"}
						placeholder={placeholder}
						error={error}
						info={info}
					/>
				)
			}}
		</Field>
	</Section>
)

export const NumberFF = ({ label, name, step, min, max, placeholder, info }) => (
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

export const TextareaFF = ({ label, name, placeholder, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return <Textarea {...input} placeholder={placeholder} error={error} info={info} />
			}}
		</Field>
	</Section>
)

export const MultiTextInputFF = ({ label, name, placeholder, info }) => (
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

export const DropdownFF = ({
	label,
	name,
	placeholder,
	options,
	isSearchable,
	isClearable,
	isMulti,
	info
}) => (
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

export const TagsInputFF = ({ label, name, placeholder, isClearable, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name} type="select">
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<TagsInput
						{...input}
						placeholder={placeholder}
						error={error}
						isClearable={isClearable}
						info={info}
					/>
				)
			}}
		</Field>
	</Section>
)

export const FileHandlerFF = ({ label, name, info }) => (
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

export const FileHandlerSingleFF = ({ label, name, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null

				return (
					<FileHandlerSingle
						{...input}
						error={error}
						info={info}
						containerStyles={css`
							width: 280px;
							height: 280px;
							margin: 0 auto;
						`}
					/>
				)
			}}
		</Field>
	</Section>
)

export const UserImageFF = ({ label, name, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null

				return (
					<FileHandlerSingle
						{...input}
						error={error}
						info={info}
						containerStyles={css`
							width: 220px;
							height: 220px;
							border-radius: 50%;
							margin: 0 auto;
						`}
					/>
				)
			}}
		</Field>
	</Section>
)

export const LiveFileHandlerFF = ({ label, name, uploadPath, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<LiveFileHandler {...input} uploadPath={uploadPath} error={error} info={info} />
				)
			}}
		</Field>
	</Section>
)

export const RatingFF = ({ label, name, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<FormElementContainer error={error} info={info}>
						<StarRatings
							rating={+input.value}
							changeRating={input.onChange}
							starRatedColor="gold"
							starHoverColor="#ffc311"
							numberOfStars={5}
							starDimension="20px"
							starSpacing="2px"
						/>
					</FormElementContainer>
				)
			}}
		</Field>
	</Section>
)

export const withFormFieldWrapper = (C) => (props) => {
	let { label, showLabel = true, placeholder, name, ...rest } = props

	if (showLabel && !label && process.env.NODE_ENV === "development") {
		console.warn(
			"A form field is missing a label. If you don't want to use a label for this field, give it showLabel={false}"
		)
	}

	// show label if it's provided and not intentionally hidden
	showLabel = !!label && showLabel !== false
	// if placeholder is not provided it defaults to the same value as label
	// if set to null, no placeholder will be shown
	placeholder = props.placeholder !== undefined ? props.placeholder : props.label

	return (
		<Section>
			{showLabel && <FieldLabel>{props.label}</FieldLabel>}
			<C placeholder={placeholder} {...rest} />
		</Section>
	)
}

export const useFinalFormFieldAdapter = (name) => {
	const { input, meta } = useField(name)
	const error = meta.error && meta.touched ? meta.error : null
	return { ...input, error }
}

export const withFinalFormFieldAdapter = (C) => (props) => {
	const finalFormAdapterProps = useFinalFormFieldAdapter(props.name)
	return <C {...props} {...finalFormAdapterProps} />
}

// export const withFinalFormWrapper = (C) => (props) => {
// 	let { label, showLabel = true, placeholder, name, ...rest } = props

// 	if (showLabel && !label && process.env.NODE_ENV === "development") {
// 		console.warn(
// 			"A final form field is missing a label. If you don't want to use a label for this field, give it showLabel={false}"
// 		)
// 	}

// 	// show label if it's provided and not intentionally hidden
// 	showLabel = !!label && showLabel !== false
// 	// if placeholder is not provided it defaults to the same value as label
// 	// if set to null, no placeholder will be shown
// 	placeholder = props.placeholder !== undefined ? props.placeholder : props.label

// 	return (
// 		<Section>
// 			{showLabel && <FieldLabel>{props.label}</FieldLabel>}
// 			<Field name={props.name}>
// 				{({ input, meta }) => {
// 					const error = meta.error && meta.touched ? meta.error : null
// 					return <C {...input} placeholder={placeholder} error={error} {...rest} />
// 				}}
// 			</Field>
// 		</Section>
// 	)
// }
