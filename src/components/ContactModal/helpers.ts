export const getMailtoLink = (email: string, subject?: string): string => {

  let mailtoLink = `mailto:${email}`
  if (subject) mailtoLink += `?subject=${subject}`

  return mailtoLink
}
