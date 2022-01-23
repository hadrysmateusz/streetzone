export const getMailtoLink = (email: string, subject: string): string | null => {
  if (!email) return null

  let mailtoLink = `mailto:${email}`
  if (subject) mailtoLink += `?subject=${subject}`

  return mailtoLink
}
