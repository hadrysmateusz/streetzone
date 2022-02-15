export type FlashMessage = {
  id: string
  type: "error" | "success" | "info"
  text: string
  details?: string
}

export type FlashMessageInput = Omit<FlashMessage, "id">

export type AddMessageFn = (message: FlashMessageInput) => void

export type DeleteMessageFn = (id: string) => void