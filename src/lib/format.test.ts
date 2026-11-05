import { describe, expect, it } from "vitest";

import { faNumber, faRialCompact, jalaliShort, toFaDigits } from "./format";

describe("Persian formatting", () => {
  it("converts ASCII digits to Persian digits", () => {
    expect(toFaDigits("کد 1405-27")).toBe("کد ۱۴۰۵-۲۷");
  });

  it("formats numbers with Persian digits", () => {
    expect(faNumber(412)).toBe("۴۱۲");
  });

  it("shows billions of Rial as میلیارد ریال", () => {
    expect(faRialCompact(115_400_000_000)).toEqual({ amount: "۱۱۵٫۴", unit: "میلیارد ریال" });
  });

  it("renders dates in the Jalali calendar", () => {
    // 6 Nov 2026 (Tehran) = 15 Aban 1405
    expect(jalaliShort(new Date("2026-11-06T08:00:00Z"))).toBe("۱۴۰۵/۰۸/۱۵");
  });
});
