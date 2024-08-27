export function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
  const toDate = new Date(date);
  return new Intl.DateTimeFormat(undefined, options).format(toDate);
}
