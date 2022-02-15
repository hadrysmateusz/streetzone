export interface Drop {
  id: string
  name: string
  description: string
  designers: string[]
  itemCategory: string
  price: string
  buyAt: string
  tags: string[]
  // howMany: string

  dropsAtString: string
  dropsAtApproxTimestamp: number

  imageUrls: string[]
  attachments: string[]
  mainImageIndex: number

  createdAt: number
  editedAt: number

  isArchived: boolean
}

export type DropReadonly = Pick<Drop, "id" | "createdAt">

export type DropCalculated = Pick<Drop, "dropsAtApproxTimestamp" | "editedAt">

export type DropEditable = Omit<Drop, keyof (DropReadonly & DropCalculated)>

export type DropCreateInputData = Pick<
  Drop,
  | "name"
  | "description"
  | "dropsAtString"
  | "designers"
  | "itemCategory"
  | "price"
  | "attachments"
  | "mainImageIndex"
  | "imageUrls"
  | "buyAt"
  | "tags"
>

export type DropUpdateInputData = Partial<DropEditable>
