const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Replace every ASCII digit in a string with its Persian equivalent. */
export function toFaDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

/** Format a number with Persian digits and Persian thousands separators. */
export function faNumber(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

/** Amount in Rial, e.g. "۲۸۰٬۱۲۰٬۰۰۰ ریال". */
export function faRial(value: number): string {
  return `${faNumber(value)} ریال`;
}

/** Compact Rial amount: millions → "میلیون", billions → "میلیارد". */
export function faRialCompact(value: number): { amount: string; unit: string } {
  if (value >= 1_000_000_000) {
    return { amount: faNumber(value / 1_000_000_000, 1), unit: "میلیارد ریال" };
  }
  if (value >= 1_000_000) {
    return { amount: faNumber(value / 1_000_000, 1), unit: "میلیون ریال" };
  }
  return { amount: faNumber(value), unit: "ریال" };
}

/** Percentage with the sign after the number, e.g. "۴٫۲٪" or "۴۰٪". */
export function faPercent(value: number, fractionDigits = 1): string {
  return `${faNumber(Math.abs(value), fractionDigits)}٪`;
}

/** Long Jalali date, e.g. "پنجشنبه ۱۵ آبان ۱۴۰۵". */
export function jalaliLong(date: Date): string {
  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Tehran",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")} ${get("day")} ${get("month")} ${get("year")}`;
}

/** Day and month name in the Jalali calendar, e.g. "۳۰ آبان". */
export function jalaliDayMonth(date: Date | string): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    timeZone: "Asia/Tehran",
  }).format(toDate(date));
}

/** Accepts a Date or an ISO date string ("2026-11-05" is read as midday Tehran time). */
function toDate(date: Date | string): Date {
  if (date instanceof Date) return date;
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T08:30:00Z`) : new Date(date);
}

/** Numeric Jalali date, e.g. "۱۴۰۵/۰۸/۱۵". */
export function jalaliShort(input: Date | string): string {
  const date = toDate(input);
  const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tehran",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return toFaDigits(`${get("year").replace(/\D/g, "")}/${get("month")}/${get("day")}`);
}
