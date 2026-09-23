const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** ISO `YYYY-MM-DD` → "Month D, YYYY" without locale/Date (hydration-safe). */
export function formatBlogDate(iso: string) {
  const [year, month, day] = iso.split("-");
  const monthIndex = Number(month) - 1;
  return `${MONTHS[monthIndex] ?? month} ${Number(day)}, ${year}`;
}
