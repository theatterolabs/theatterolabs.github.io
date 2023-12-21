export const validateImageURL = (url: string) => {
  const result = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg|webp))/i.exec(url)

  return !!result
}
