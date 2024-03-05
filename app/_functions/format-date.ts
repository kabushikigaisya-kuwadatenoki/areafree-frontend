export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月は0から始まるため、+1する
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
