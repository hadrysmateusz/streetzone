import { Form } from "react-final-form"

import { ButtonContainer } from "../../components/Button"
import { TextBlock } from "../../components/StyledComponents"
import { StyledLink } from "../../components/Basics"
import {
  DropdownFFUnwrapped,
  FileHandlerFFUnwrapped,
  FormSubmitButton,
  NumberFFUnwrapped,
  TextareaFFUnwrapped,
  TextInputFFUnwrapped,
} from "../../components/FinalFormFields"
import InfoBox from "../../components/InfoBox"

import { CONST, ITEM_SCHEMA, ROUTES } from "../../constants"
import { useDesignerOptions } from "../../hooks"

import validate from "./validate"
import { FormElement, StyledForm } from "./NewItemForm.styles"
import { SizeInput } from "./SizeInput"

const NewItemForm = ({ onSubmit }) => {
  const designerOptions = useDesignerOptions()

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <>
            <TextBlock size="m" bold uppercase>
              Informacje
            </TextBlock>

            {/* Name */}
            <FormElement>
              <TextInputFFUnwrapped name="name" placeholder="Nazwa" />
            </FormElement>

            {/* Designers */}
            <>
              <FormElement>
                <DropdownFFUnwrapped
                  name="designers"
                  placeholder="Projektanci / Marki"
                  info="Możesz wybrać więcej niż jedną markę w przypadku kolaboracji"
                  options={designerOptions}
                  isSearchable={true}
                  isClearable={true}
                  isMulti={true}
                />
              </FormElement>

              <InfoBox span={2}>
                <TextBlock>
                  Jeśli nie znalazłeś marki której potrzebujesz, użyj formularza
                  dostępnego{" "}
                  <StyledLink to={ROUTES.REQUEST_DESIGNER}>tutaj</StyledLink> by
                  dać nam znać
                </TextBlock>
              </InfoBox>
            </>

            {/* Category */}
            <FormElement small>
              <DropdownFFUnwrapped
                name="category"
                placeholder="Kategoria"
                options={ITEM_SCHEMA.categoryOptions}
                isSearchable={false}
                isMulti={false}
              />
            </FormElement>

            {/* Size */}
            <FormElement small>
              <SizeInput name="size" />
            </FormElement>

            {/* Price */}
            <FormElement small>
              <NumberFFUnwrapped
                name="price"
                min="0"
                step="1"
                placeholder="Cena"
              />
            </FormElement>

            {/* Condition */}
            <>
              <FormElement small>
                <DropdownFFUnwrapped
                  name="condition"
                  placeholder="Stan"
                  info="Więcej informacji poniżej"
                  options={ITEM_SCHEMA.conditionOptions}
                  isSearchable={false}
                  isMulti={false}
                />
              </FormElement>

              <InfoBox columns={2} span={2}>
                <TextBlock>
                  <b>DS (Deadstock)</b> - Przedmiot nowy, oryginalnie
                  zapakowany.
                </TextBlock>
                <TextBlock>
                  <b>VNDS (Very Near Deadstock)</b> - Przedmiot nowy, bez śladów
                  użytkowania.
                </TextBlock>
              </InfoBox>
            </>
          </>

          <>
            {/* Description */}

            <TextBlock size="m" bold uppercase>
              Opis
            </TextBlock>

            <FormElement>
              <TextareaFFUnwrapped
                name="description"
                placeholder={CONST.ITEM_DESC_PLACEHOLDER}
              />
            </FormElement>
          </>

          <>
            {/* Files (handled by separate component) */}

            <TextBlock size="m" bold uppercase>
              Zdjęcia
            </TextBlock>

            <InfoBox span={2}>
              <TextBlock>
                Co najmniej na jednym zdjęciu powinna znajdować się kartka z
                twoją nazwą użytkownika. Zdjęcie główne zostanie miniaturą
                widoczną m.in. na stronie głównej.
              </TextBlock>
            </InfoBox>

            <FormElement>
              <FileHandlerFFUnwrapped name="files" />
            </FormElement>
          </>

          <FormElement>
            <ButtonContainer>
              <FormSubmitButton text="Gotowe" big />
            </ButtonContainer>
          </FormElement>
        </StyledForm>
      )}
    />
  )
}

export default NewItemForm
