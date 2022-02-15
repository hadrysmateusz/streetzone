import { heartbeatAnimation, shakeAnimation } from "../../style-utils"

export type SaveButtonTypes = keyof typeof TYPE

export const TYPE = {
  item: {
    actionType: "save",
    attribute: "savedItems",
    text: "Zapisz",
    activeText: "Zapisano",
    icon: "heart",
    animation: heartbeatAnimation,
  },
  user: {
    actionType: "save",
    attribute: "followedUsers",
    text: "Obserwuj",
    activeText: "Obserwujesz",
    icon: "bell",
    animation: shakeAnimation,
  },
  drop: {
    actionType: "follow",
    attribute: "followedDrops",
    text: "Obserwuj",
    activeText: "Obserwujesz",
    icon: "bell",
    animation: shakeAnimation,
  },
} as const