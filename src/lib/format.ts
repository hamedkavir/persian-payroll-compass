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

/** Numeric Jalali date, e.g. "۱۴۰۵/۰۸/۱۵". */
export function jalaliShort(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tehran",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return toFaDigits(`${get("year").replace(/\D/g, "")}/${get("month")}/${get("day")}`);
}
