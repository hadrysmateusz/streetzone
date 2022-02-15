import { useCallback } from "react";
import { Field, Form } from "react-final-form";
import { nanoid } from "nanoid";

import { FieldLabel } from "../../../components/Basics";
import { FormError, Input } from "../../../components/FormElements";
import { FileHandler, getMainImageIndex } from "../../../components/FileHandler";
import { CONST, ITEM_SCHEMA } from "../../../constants";
import categories from "../../../constants/itemCategories";
import sizes from "../../../constants/sizes";
import getRandomInteger from "../../../utils/getRandomInteger";
import { useAuthentication, useFirebase } from "../../../hooks";
import { FormSubmitButton, getFormError } from "../../../components/FinalFormFields";

const AVAILABLE_NAMES = [
  "Fajne ale drogie",
  "O takie coś",
  "Rzecz",
  "Przykładowy itemek",
  "Kolejny cuś",
  "Super cośtam 2000",
  "Przedmiot 75"
];

const AVAILABLE_CATEGORIES = Object.values(ITEM_SCHEMA.categories);

const AddItemsPage = () => {
  const firebase = useFirebase();
  const authUser = useAuthentication();

  const uploadItem = useCallback(async (values) => {
    try {
      const files = values.files;
      const itemId = nanoid();
      const userId = values.userId;

      // Look for the document with correct id
      const userData = firebase.getUserById();
      // If the user isn't found throw an error
      if (!userData) throw new Error("Nie znaleziono użytkownika");

      // Get main image ref
      const mainImageIndex = getMainImageIndex(files);

      // Upload files to storage and get their refs
      const newAttachmentRefs =
        await firebase.batchGetAttachmentRefFromCustomFile(
          `${CONST.STORAGE_BUCKET_ITEM_ATTACHMENTS}/${userId}/${itemId}`,
          files
        );

      // Add item to database
      // TODO: ensure 'values' contains proper values
      await firebase.createItem({
        ...values,
        attachments: newAttachmentRefs,
        mainImageIndex,
        id: itemId
      });
    } catch (error) {
      alert("Wystąpił problem podczas wystawiania przedmiotu");
      console.error(error);
    }
  }, [firebase]);

  const onSubmit = useCallback(
    async (values, form) => {
      const designersSnap = await firebase.designers().get();
      const availableDesigners = designersSnap.docs.map((doc) => doc.data());

      const usersSnapshot = await firebase.users().get();
      const availableUserIds = usersSnapshot.docs.map((doc) => doc.id);

      for (let i = 0; i < values.numberOfItems; i++) {
        // name
        const name =
          AVAILABLE_NAMES[getRandomInteger(0, AVAILABLE_NAMES.length - 1)];

        // category
        const category =
          AVAILABLE_CATEGORIES[
            getRandomInteger(0, AVAILABLE_CATEGORIES.length - 1)
            ];

        // designers
        let designers = [];
        const nOfDesigners = getRandomInteger(1, 3);
        for (let i = 0; i < nOfDesigners; i++) {
          designers.push(
            availableDesigners[
              getRandomInteger(0, availableDesigners.length - 1)
              ].label
          );
        }
        designers = designers.reduce(
          (acc, curr) => (!acc.includes(curr) ? [...acc, curr] : acc),
          []
        );

        // price
        const price = getRandomInteger(50, 3500);

        // userId
        const userId = values.randomUsers
          ? availableUserIds[getRandomInteger(0, availableUserIds.length - 1)]
          : authUser.uid;

        // condition
        const condition = getRandomInteger(5, 11);

        // size
        let sizeCategory;
        if (category === categories.akcesoria) {
          sizeCategory = "accessories";
        } else if (category === categories.buty) {
          sizeCategory = "shoes";
        } else {
          sizeCategory = "clothes";
        }

        let size;
        const availableSizes = sizes[sizeCategory];
        size =
          sizeCategory +
          "-" +
          availableSizes[getRandomInteger(0, availableSizes.length - 1)];

        // description
        let description = await fetch(
          "https://baconipsum.com/api/?type=meat-and-filler&paras=1"
        );
        description = (await description.json())[0];

        // files
        const nOfAllFiles = values.files.length;
        const nOfFiles = Math.min(
          nOfAllFiles,
          getRandomInteger(1, CONST.ATTACHMENTS_MAX_COUNT)
        );
        const lastAvailableStartIndex = nOfAllFiles - nOfFiles;
        const startIndex = getRandomInteger(0, lastAvailableStartIndex);

        let files = values.files.slice(startIndex, startIndex + nOfFiles);

        await uploadItem({
          name,
          designers,
          price,
          userId,
          category,
          condition,
          size,
          description,
          files
        });
      }
      setTimeout(form.reset);
    },
    [authUser.uid, firebase, uploadItem]
  );

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {/* Number of items */}
          <div>
            {/* TODO: fix missing attribute name */}
            <Field>
              {({ input, meta }) => {
                return (
                  <Input
                    {...input}
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Number of items"
                    error={getFormError(meta)}
                  />
                );
              }}
            </Field>
          </div>

          {/* Random users */}
          <div>
            {/* TODO: fix missing attribute name */}
            <Field name="randomUsers">
              {({ input, meta }) => (
                <>
                  <FieldLabel>Random users </FieldLabel>
                  <input {...input} type="checkbox" />
                  <FormError
                    message={meta.error}
                    show={meta.error && meta.touched}
                  />
                </>
              )}
            </Field>
          </div>

          {/* Files (handled by separate component) */}
          <div>
            <FieldLabel>Zdjęcia</FieldLabel>

            <Field name="files">
              {({ input, meta }) => {
                const error =
                  meta.error && meta.touched ? meta.error.main : null;
                const itemErrors = meta.error ? meta.error.specific : null;
                return (
                  <FileHandler
                    {...input}
                    error={error}
                    itemErrors={itemErrors}
                  />
                );
              }}
            </Field>
          </div>

          <FormSubmitButton text="Gotowe" fullWidth={false} />
        </form>
      )}
    />
  );
};

export default AddItemsPage;
