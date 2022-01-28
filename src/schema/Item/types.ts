export interface Item {
  id: string
  name: string
  category: string
  price: number
  condition: number
  userId: string
  size: string
  description: string
  designers: string[]

  mainImageIndex: number
  attachments: string[]

  bumps: number
  promotingLevel: number | null
  promotedUntil: number | null
  promotedAt: number | null
  refreshedAt: number

  isVerified: boolean
  isArchived: boolean

  createdAt: number
  modifiedAt: number
}

export type ItemReadonly = Pick<
  Item,
  | "id"
  | "createdAt"
  | "userId"
  | "promotingLevel"
  | "promotedAt"
  | "promotedUntil"
>

export type ItemCalculated = Pick<Item, "modifiedAt" | "isVerified">

export type ItemEditable = Omit<Item, keyof (ItemReadonly & ItemCalculated)>

export type ItemCreateInputData = Pick<
  Item,
  | "id"
  | "name"
  | "designers"
  | "attachments"
  | "mainImageIndex"
  | "category"
  | "price"
  | "condition"
  | "size"
  | "description"
  | "userId"
>

export type ItemUpdateInputData = Partial<ItemEditable>
