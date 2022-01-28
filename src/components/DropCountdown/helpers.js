import moment from "moment"

import { dateFormat } from "../../schema"

export const formatValue = (dropsAt) => {
  const then = moment(dropsAt, dateFormat)
  const now = moment()

  const duration = moment.duration(then.diff(now))

  const totalHours = Math.floor(duration.asHours())
  const minutes = duration.minutes()

  const isDropInFuture = then.isAfter(now) // this isn't reliable for dates without specified time
  const isTimeKnown = dropsAt && dropsAt.length > 9
  const isSoon = totalHours && totalHours <= 48
  const isToday = now.isSame(then, "day")

  // isDropInFuture isn't reliable for dates without specified time so it requires a special case
  if (!isDropInFuture && isToday) {
    return "Dzisiaj"
  }

  // all further cases require the date to be in the future
  if (!isDropInFuture) {
    return null
  }

  // 21 hours is when moment starts to show hours instead of days
  // if the hour isn't known, prevent from showing misleading information
  if (!isTimeKnown && totalHours <= 21) {
    return "Jutro"
  }

  // if the drop is very soon and the exact time is known, display countdown
  if (isTimeKnown && isSoon) {
    return `${totalHours}h ${minutes}min`
  }

  // by default return date formatted by moment.js
  return moment().to(then, true)
}
