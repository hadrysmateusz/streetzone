import React, {useCallback, useEffect, useState} from "react"

import LoadingSpinner from "../../../components/LoadingSpinner"
import { PageContainer } from "../../../components/Containers"

import AddItems from "./AddItems"

import { useFirebase } from "../../../hooks"
import { Item } from "../../../schema"

export const ItemsManagement: React.FC = () => {
  const firebase = useFirebase()

  const [inputValue, setInputValue] = useState<string>("")
  const [error, setError] = useState<any | null>(null)
  const [foundItem, setFoundItem] = useState<Item | null>(null)
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  },[])

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault()

    const id = inputValue.trim()

    const itemData = await firebase.getItemById(id)

    if (!itemData) {
      setError(new Error("item not found"))
      return
    }

    setInputValue("")
    setFoundItem(itemData)
  },[firebase, inputValue])

  const onDelete = useCallback(async (id: string) => {
    await firebase.item(id).delete()
  },[firebase])

  useEffect(() => {
    const removeListener = firebase
      .items()
      .onSnapshot(async (itemsSnapshot) => {
        const items = itemsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id, // TODO: why is this uid? probably change this (maybe this was supposed to get a user's items)
        }))
        setItems(items)
        setIsLoading(false)
      })
    return () => removeListener()
  }, [firebase])

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageContainer>
      {error ? <div>{error.message}</div> : null}

      {/*<TextBlock size="xl" bold>*/}
      {/*  Ogłoszenia*/}
      {/*</TextBlock>*/}

      {/*<TextBlock size="m" color="gray0">*/}
      {/*  Dodaj*/}
      {/*</TextBlock>*/}

      <AddItems />

      {/*<TextBlock size="m" color="gray0">*/}
      {/*  Znajdź po ID*/}
      {/*</TextBlock>*/}

      {/*<form onSubmit={onSubmit}>*/}
      {/*  <input type="text" onChange={onChange} value={inputValue} />*/}
      {/*  <input type="submit" />*/}
      {/*</form>*/}

      {/*{foundItem ? (*/}
      {/*  <div>*/}
      {/*    <h3>Znaleziony</h3>*/}
      {/*    {foundItem.name} {foundItem.email}*/}
      {/*  </div>*/}
      {/*): null}*/}

      {/*<TextBlock size="m" color="gray0">*/}
      {/*  Wszystkie ogłoszenia*/}
      {/*</TextBlock>*/}

      {/*{items.length > 0 ? (*/}
      {/*  <ul>*/}
      {/*    {items.map((item) => (*/}
      {/*        <li key={item.id}>*/}
      {/*          <Link to={ROUTES.ITEM_DETAILS.replace(":id", item.id)}>*/}
      {/*            {item.name} {item.email} <strong>{item.uid}</strong>*/}
      {/*          </Link>*/}
      {/*          <button onClick={() => onDelete(item.id)}>X</button>*/}
      {/*        </li>*/}
      {/*      )*/}
      {/*    )}*/}
      {/*  </ul>*/}
      {/*):null}*/}
    </PageContainer>
  )
}

export default ItemsManagement
