import moment from "moment"

export const dateFormat = "YY-MM-DD HH:mm"

export function calculateDropsAtApproxTimestamp(dropsAtString: string): number {
  return moment(dropsAtString, dateFormat).valueOf()
}

