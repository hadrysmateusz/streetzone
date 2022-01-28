export interface Deal {
  id: string
  title: string
  description: string
  designers: string[]
  value: string
  imageRef: string
  link: string

  createdAt: number
  editedAt: number

  isArchived: boolean
}

export type DealReadonly = Pick<Deal, "id" | "createdAt">

export type DealCalculated = Pick<Deal, "editedAt">

export type DealEditable = Omit<Deal, keyof (DealReadonly & DealCalculated)>

export type DealCreateInputData = Pick<
  Deal,
  "title" | "description" | "designers" | "value" | "imageRef" | "link"
>

export type DealUpdateInputData = Partial<DealEditable>
