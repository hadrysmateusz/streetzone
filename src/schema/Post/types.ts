export interface Post {
  id: string
  title: string
  author: string
  category: string
  mainContent: string
  excerpt: string
  tags: string[]

  attachments: string[]
  imageUrls: string[]
  mainImageIndex: number

  createdAt: number
  editedAt: number

  isArchived: boolean
  isPromoted: boolean
}

export type PostReadonly = Pick<Post, "id" | "createdAt">

export type PostCalculated = Pick<Post, "editedAt">

export type PostEditable = Omit<Post, keyof (PostReadonly & PostCalculated)>

export type PostCreateInputData = Pick<
  Post,
  | "id"
  | "title"
  | "author"
  | "category"
  | "mainContent"
  | "excerpt"
  | "tags"
  | "attachments"
  | "mainImageIndex"
  | "imageUrls"
>

export type PostUpdateInputData = Partial<PostEditable>
