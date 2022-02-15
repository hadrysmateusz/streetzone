import { Form } from "react-final-form"

import BlackBox from "../../../components/BlackBox"
import LoadingSpinner from "../../../components/LoadingSpinner"
import {
  DropdownFF,
  LiveFileHandlerFF,
  TagsInputFF,
  TextareaFF,
  TextFF,
  UnsavedChangesPrompt,
} from "../../../components/FinalFormFields"
import { FinalFormPostEditor } from "../../../components/PostEditor"
import { StyledForm } from "../../../components/BasicStyledForm"
import { CONST } from "../../../constants"

import { AdminFormButtons } from "../AdminFormButtons"

import categoryOptions from "./postCategoryOptions"
import authorOptions from "./authorOptions"

export const BlogForm = ({ onSubmit, initialValues, edit, postId }) => {
  // use postId to group images by the post they belong to
  const imagesPath = `${CONST.STORAGE_BUCKET_BLOG_ATTACHMENTS}/${postId}`

  return !initialValues && edit ? (
    <LoadingSpinner />
  ) : (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <UnsavedChangesPrompt when={(formState) => formState.dirty} />

          <DropdownFF
            label="Autor"
            name="author"
            options={authorOptions}
            isMulti={false}
          />

          <TextFF label="Tytuł" placeholder="Tytuł" name="title" />

          <DropdownFF
            label="Kategoria"
            name="category"
            options={categoryOptions}
            isSearchable={false}
            isMulti={false}
          />

          <LiveFileHandlerFF
            label="Zdjęcia"
            name="files"
            uploadPath={imagesPath}
          />

          <BlackBox>
            Pamiętaj usunąć nieużyte zdjęcia przed opuszczeniem strony
          </BlackBox>

          <FinalFormPostEditor
            label="Treść"
            contentName="mainContent"
            attachmentsName="attachments"
          />

          <TextareaFF
            label="Streszczenie"
            placeholder="Krótkie streszczenie zachęcające do przeczytania. Ewentualnie pierwsze zdanie lub dwa."
            name="excerpt"
          />

          <TagsInputFF label="Tagi" placeholder="Tagi" name="tags" disabled />

          <AdminFormButtons />
        </StyledForm>
      )}
    />
  )
}

export default BlogForm
